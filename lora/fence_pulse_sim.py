# save as fence_pulse_sim.py
# Usage: python fence_pulse_sim.py
# Produces CSV files in ./out/
import os, csv, math, argparse
from datetime import datetime
import numpy as np

try:
    import matplotlib.pyplot as plt
    MATPLOTLIB = True
except:
    MATPLOTLIB = False

# -------------------------
# Helper: create a single pulse shape (fast rise, exponential decay)
# -------------------------
def single_pulse(t, t0, amp, width_ms, decay_ms):
    # t: numpy time vector (s)
    # t0: pulse center time (s)
    # amp: peak voltage (V)
    # width_ms: approximate pulse width (ms) -> controls rise
    # decay_ms: time constant for exponential tail (ms)
    sigma = (width_ms/1000.0) / 3.0     # gaussian-ish width
    gauss = amp * np.exp(-0.5 * ((t - t0) / sigma)**2)
    # multiply by an exponential tail for t>t0 to mimic HV pulse discharge
    tail = np.ones_like(t)
    idx = t >= t0
    tail[idx] = np.exp(-(t[idx]-t0) / (decay_ms/1000.0))
    return gauss * tail

# -------------------------
# Compose waveform for different scenario types
# -------------------------
def make_waveform(duration_s=5.0, fs=20000,
                  pulse_amp=5000.0, pulse_width_ms=1.0, pulse_period_s=1.0, decay_ms=3.0,
                  scenario='normal', cut_after=None):
    """
    scenario: 'normal','short','cut','arcing','intermittent'
    cut_after: if set (seconds) -> simulate a physical cut: after cut_after, no pulses
    """
    n = int(duration_s * fs)
    t = np.linspace(0, duration_s, n, endpoint=False)
    v = np.zeros_like(t)

    # compute nominal pulse centers
    centers = np.arange(pulse_period_s/2, duration_s, pulse_period_s)
    for c in centers:
        if cut_after is not None and c >= cut_after:
            break
        if scenario == 'normal':
            v += single_pulse(t, c, pulse_amp, pulse_width_ms, decay_ms)
        elif scenario == 'short':
            # model a near-short: amplitude falls and decay faster
            v += single_pulse(t, c, pulse_amp*0.25, pulse_width_ms*0.7, decay_ms*0.5)
        elif scenario == 'cut':
            # initial few pulses normal then no pulses (cut)
            v += single_pulse(t, c, pulse_amp, pulse_width_ms, decay_ms)
        elif scenario == 'arcing':
            # normal pulse + damped high-frequency oscillation (arcing)
            v += single_pulse(t, c, pulse_amp, pulse_width_ms, decay_ms)
            # add damped HF term centered on c
            hf = (0.3 * pulse_amp) * np.exp(-((t-c)/(0.0005))**2) * np.sin(2*np.pi*5000*(t-c))
            v += hf
        elif scenario == 'intermittent':
            # sometimes skip pulses
            if np.random.rand() > 0.3:
                v += single_pulse(t, c, pulse_amp, pulse_width_ms, decay_ms)
        else:
            v += single_pulse(t, c, pulse_amp, pulse_width_ms, decay_ms)

    # add slow leakage & noise
    noise = np.random.normal(scale=0.02 * pulse_amp, size=v.shape)
    leak = -0.0001 * (t - t[0]) * pulse_amp  # tiny slow drift (optional)
    v = v + noise + leak

    # For cut scenario we might want to zero pulses after cut_after
    if scenario == 'cut' and cut_after is not None:
        # zero out pulses after cut_after (already handled in loop) but apply residual noise
        pass

    return t, v

# -------------------------
# ADC conversion function
# -------------------------
def voltage_to_adc(voltage_array, divider_ratio=10000.0, vref=3.3, adc_bits=12):
    # divider_ratio = Vin / Vout (example: 10000 means Vout = Vin / 10000)
    vout = voltage_array / divider_ratio
    vmax = vref
    # clamp to [0, vmax] and convert to ADC counts
    vout_clamped = np.clip(vout, 0.0, vmax)
    adc_max = 2**adc_bits - 1
    adc = np.round((vout_clamped / vmax) * adc_max).astype(int)
    return adc

# -------------------------
# Main generation + export
# -------------------------
def export_csv(t, v, adc, outpath):
    os.makedirs(os.path.dirname(outpath), exist_ok=True)
    with open(outpath, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['time_s','voltage_V','adc_value'])
        for ti, vi, ai in zip(t, v, adc):
            writer.writerow([f"{ti:.8f}", f"{vi:.6f}", int(ai)])

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--duration', type=float, default=6.0)
    parser.add_argument('--fs', type=float, default=20000.0)
    parser.add_argument('--amp', type=float, default=5000.0)
    parser.add_argument('--pwidth', type=float, default=1.0) # ms
    parser.add_argument('--period', type=float, default=1.0)
    parser.add_argument('--decay', type=float, default=3.0)
    parser.add_argument('--divider', type=float, default=10000.0)
    parser.add_argument('--adc_bits', type=int, default=12)
    parser.add_argument('--vref', type=float, default=3.3)
    parser.add_argument('--scenario', type=str, default='normal')
    parser.add_argument('--cut_after', type=float, default=None)
    parser.add_argument('--outdir', type=str, default='./out')
    args = parser.parse_args()

    t, v = make_waveform(duration_s=args.duration, fs=args.fs,
                         pulse_amp=args.amp, pulse_width_ms=args.pwidth,
                         pulse_period_s=args.period, decay_ms=args.decay,
                         scenario=args.scenario, cut_after=args.cut_after)

    adc = voltage_to_adc(v, divider_ratio=args.divider, vref=args.vref, adc_bits=args.adc_bits)

    timestamp = datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')
    fname = f"{args.outdir}/{args.scenario}_{timestamp}.csv"
    export_csv(t, v, adc, fname)
    print("Exported:", fname)

    if MATPLOTLIB:
        plt.figure(figsize=(10,3))
        plt.plot(t, v, label='voltage (V)')
        # show a small zoom of first 0.05s to see pulse shape
        plt.xlim(0, min(0.05, t[-1]))
        plt.title(f"Scenario={args.scenario}")
        plt.xlabel('time (s)')
        plt.ylabel('Voltage (V)')
        plt.grid(True)
        plt.show()

if __name__ == '__main__':
    main()
