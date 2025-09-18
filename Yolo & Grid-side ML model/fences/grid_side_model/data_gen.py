import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import json

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

# Kerala districts and their major cities/towns
kerala_geography = {
    'Thiruvananthapuram': {
        'cities': ['Thiruvananthapuram', 'Neyyattinkara', 'Attingal', 'Varkala', 'Nedumangad'],
        'lat_range': (8.17, 8.83), 'lon_range': (76.41, 77.17)
    },
    'Kollam': {
        'cities': ['Kollam', 'Punalur', 'Paravur', 'Karunagappally', 'Anchal'],
        'lat_range': (8.67, 9.18), 'lon_range': (76.34, 76.95)
    },
    'Pathanamthitta': {
        'cities': ['Pathanamthitta', 'Adoor', 'Thiruvalla', 'Mallappally', 'Kozhencherry'],
        'lat_range': (9.16, 9.59), 'lon_range': (76.67, 77.17)
    },
    'Alappuzha': {
        'cities': ['Alappuzha', 'Cherthala', 'Kayamkulam', 'Mavelikkara', 'Haripad'],
        'lat_range': (9.15, 9.62), 'lon_range': (76.17, 76.78)
    },
    'Kottayam': {
        'cities': ['Kottayam', 'Changanassery', 'Vaikom', 'Pala', 'Ettumanoor'],
        'lat_range': (9.36, 9.88), 'lon_range': (76.43, 76.90)
    },
    'Idukki': {
        'cities': ['Painavu', 'Thodupuzha', 'Munnar', 'Kumily', 'Adimali'],
        'lat_range': (9.51, 10.21), 'lon_range': (76.73, 77.58)
    },
    'Ernakulam': {
        'cities': ['Kochi', 'Aluva', 'Perumbavoor', 'Angamaly', 'Kothamangalam'],
        'lat_range': (9.87, 10.15), 'lon_range': (76.17, 76.83)
    },
    'Thrissur': {
        'cities': ['Thrissur', 'Chalakudy', 'Kodungallur', 'Irinjalakuda', 'Kunnamkulam'],
        'lat_range': (10.29, 10.73), 'lon_range': (76.04, 76.37)
    },
    'Palakkad': {
        'cities': ['Palakkad', 'Ottappalam', 'Shoranur', 'Chittur', 'Mannarkkad'],
        'lat_range': (10.46, 11.16), 'lon_range': (76.21, 76.94)
    },
    'Malappuram': {
        'cities': ['Malappuram', 'Manjeri', 'Perinthalmanna', 'Ponnani', 'Tirur'],
        'lat_range': (10.70, 11.45), 'lon_range': (75.83, 76.42)
    },
    'Kozhikode': {
        'cities': ['Kozhikode', 'Vadakara', 'Koyilandy', 'Feroke', 'Ramanattukara'],
        'lat_range': (11.15, 11.61), 'lon_range': (75.49, 76.27)
    },
    'Wayanad': {
        'cities': ['Kalpetta', 'Sulthan Bathery', 'Mananthavady', 'Vythiri', 'Meenangadi'],
        'lat_range': (11.60, 11.87), 'lon_range': (75.47, 76.45)
    },
    'Kannur': {
        'cities': ['Kannur', 'Thalassery', 'Payyanur', 'Mattannur', 'Iritty'],
        'lat_range': (11.87, 12.31), 'lon_range': (75.13, 75.92)
    },
    'Kasaragod': {
        'cities': ['Kasaragod', 'Kanhangad', 'Nileshwar', 'Uppala', 'Manjeshwar'],
        'lat_range': (12.30, 12.77), 'lon_range': (74.85, 75.37)
    }
}

# Generate realistic area names (villages/localities)
area_suffixes = ['puram', 'nagar', 'para', 'mukku', 'thara', 'veli', 'kunnu', 'kavu', 'moodu', 'vayal']
area_prefixes = ['Kalla', 'Velli', 'Chera', 'Palli', 'Thodu', 'Mutha', 'Vatta', 'Kotta', 'Mela', 'Kizhak', 
                'Padam', 'Nalla', 'Puzha', 'Thekke', 'Vadakke', 'Idava', 'Manja', 'Petta', 'Kodu', 'Mana']

def generate_area_name():
    """Generate realistic Kerala area names"""
    return f"{random.choice(area_prefixes)}{random.choice(area_suffixes)}"

def generate_coordinates(district):
    """Generate realistic coordinates for a district"""
    lat_min, lat_max = kerala_geography[district]['lat_range']
    lon_min, lon_max = kerala_geography[district]['lon_range']
    
    lat = round(np.random.uniform(lat_min, lat_max), 6)
    lon = round(np.random.uniform(lon_min, lon_max), 6)
    
    return lat, lon

def calculate_expected_consumption(households, area_type, month):
    """Calculate expected monthly consumption based on realistic patterns"""
    
    # Base consumption per household (units/month) based on Kerala patterns
    base_consumption = {
        'rural': np.random.normal(85, 25),      # Rural: 60-120 units typically
        'semi-urban': np.random.normal(140, 35), # Semi-urban: 100-180 units
        'urban': np.random.normal(195, 45)      # Urban: 150-250 units
    }
    
    # Seasonal multipliers (Kerala weather patterns)
    seasonal_multipliers = {
        1: 0.85,  # January - cooler
        2: 0.88,  # February
        3: 0.95,  # March - getting warmer
        4: 1.15,  # April - hot season begins
        5: 1.25,  # May - peak summer
        6: 1.10,  # June - monsoon starts
        7: 0.95,  # July - monsoon
        8: 0.90,  # August - monsoon
        9: 0.95,  # September - post monsoon
        10: 1.05,  # October - festival season
        11: 1.00,  # November
        12: 0.92   # December
    }
    
    per_household = max(25, base_consumption[area_type] * seasonal_multipliers[month])
    total = households * per_household
    
    # Add some randomness
    total *= np.random.uniform(0.90, 1.10)
    
    return round(total, 2)

def simulate_anomaly(expected_consumption, anomaly_type=None):
    """Simulate consumption anomalies that might indicate illegal fencing"""
    
    if anomaly_type is None:
        return expected_consumption, False
    
    if anomaly_type == 'illegal_fence':
        # Illegal electric fences typically draw 5-15 watts continuously
        # Monthly consumption = Power(kW) * 24hrs * 30days
        fence_consumption = np.random.uniform(3.6, 10.8)  # 3.6-10.8 kWh extra per month
        
        # But actual measured consumption might be higher due to inefficiencies
        multiplier = np.random.uniform(1.15, 1.45)  # 15-45% higher than expected
        actual = expected_consumption * multiplier + fence_consumption
        
        return round(actual, 2), True
    
    return expected_consumption, False

def generate_voltage_current_readings(consumption_kwh, has_anomaly, households):
    """Generate realistic voltage and current readings"""
    
    # Standard voltage in Kerala (230V single phase, but can vary)
    base_voltage = np.random.normal(230, 8)  # 220-240V typical range
    
    if has_anomaly:
        # Illegal connections might cause voltage drops
        voltage = base_voltage * np.random.uniform(0.92, 0.98)  # 2-8% voltage drop
        
        # Current would be higher due to additional load
        # I = P / V, where P is power in watts
        power_watts = consumption_kwh * 1000 / (30 * 24)  # Average power
        current = (power_watts / voltage) * np.random.uniform(1.1, 1.3)  # 10-30% higher
    else:
        voltage = base_voltage * np.random.uniform(0.96, 1.02)  # Normal variation
        power_watts = consumption_kwh * 1000 / (30 * 24)
        current = (power_watts / voltage) * np.random.uniform(0.9, 1.1)  # Normal variation
    
    return round(voltage, 1), round(current, 2)

# Generate the dataset
print("Generating comprehensive Kerala illegal electric fence detection dataset...")
print("This will include realistic consumption patterns, geographical data, and temporal features...")

dataset = []
area_counter = 0

# Generate data for 2 years (2023-2024)
start_date = datetime(2023, 1, 1)
end_date = datetime(2024, 12, 31)

# Create areas across all districts
total_areas = 400  # This will give us ~9,600 rows (400 areas × 24 months)

for area_id in range(total_areas):
    # Select random district and city
    district = random.choice(list(kerala_geography.keys()))
    city = random.choice(kerala_geography[district]['cities'])
    area_name = generate_area_name()
    
    # Generate coordinates
    latitude, longitude = generate_coordinates(district)
    
    # Area characteristics
    area_type = np.random.choice(['rural', 'semi-urban', 'urban'], p=[0.6, 0.25, 0.15])  # Kerala is largely rural
    households = np.random.randint(15, 200)  # Realistic household count per area
    
    # Distance to substation (km) - based on area type
    if area_type == 'urban':
        dist_to_substation = round(np.random.uniform(0.5, 5.0), 2)
    elif area_type == 'semi-urban':
        dist_to_substation = round(np.random.uniform(2.0, 12.0), 2)
    else:  # rural
        dist_to_substation = round(np.random.uniform(5.0, 25.0), 2)
    
    # Local incident reports (binary)
    has_local_reports = random.choice([True, False]) if random.random() < 0.15 else False
    
    # Determine if this area has illegal fencing (only 5-8% of areas)
    has_illegal_fence = random.random() < 0.07  # 7% of areas have illegal fencing
    
    # Generate monthly readings for this area
    current_date = start_date
    while current_date <= end_date:
        month = current_date.month
        year = current_date.year
        
        # Calculate expected consumption for this month
        expected_consumption = calculate_expected_consumption(households, area_type, month)
        
        # Simulate actual consumption (with potential anomalies)
        if has_illegal_fence and random.random() < 0.8:  # 80% chance of detection in affected areas
            actual_consumption, is_suspicious = simulate_anomaly(expected_consumption, 'illegal_fence')
        else:
            actual_consumption, is_suspicious = simulate_anomaly(expected_consumption, None)
        
        # Generate voltage and current readings
        voltage, current = generate_voltage_current_readings(actual_consumption, is_suspicious, households)
        
        # Create record
        record = {
            'area_id': f"KL_{area_id:04d}",
            'district': district,
            'city': city,
            'area_name': area_name,
            'latitude': latitude,
            'longitude': longitude,
            'area_type': area_type,
            'households': households,
            'distance_to_substation_km': dist_to_substation,
            'local_incident_reports': has_local_reports,
            'year': year,
            'month': month,
            'timestamp': current_date.strftime('%Y-%m-%d'),
            'expected_consumption_kwh': expected_consumption,
            'actual_consumption_kwh': actual_consumption,
            'voltage_reading_v': voltage,
            'current_reading_a': current,
            'consumption_deviation_pct': round(((actual_consumption - expected_consumption) / expected_consumption) * 100, 2),
            'illegal_fence_suspected': is_suspicious
        }
        
        dataset.append(record)
        
        # Move to next month
        if current_date.month == 12:
            current_date = current_date.replace(year=current_date.year + 1, month=1)
        else:
            current_date = current_date.replace(month=current_date.month + 1)
    
    if (area_id + 1) % 50 == 0:
        print(f"Generated data for {area_id + 1} areas...")

# Convert to DataFrame
df = pd.DataFrame(dataset)

# Add some additional calculated features
df['power_factor'] = np.random.normal(0.85, 0.05, len(df))  # Typical power factor
df['load_factor'] = df['actual_consumption_kwh'] / (df['households'] * 250)  # Load factor (max possible = 250 units)
df['consumption_per_household'] = df['actual_consumption_kwh'] / df['households']

# Add some seasonal indicators
df['is_summer'] = df['month'].isin([3, 4, 5])
df['is_monsoon'] = df['month'].isin([6, 7, 8, 9])
df['is_winter'] = df['month'].isin([12, 1, 2])

# Round numerical columns appropriately
df['power_factor'] = df['power_factor'].round(3)
df['load_factor'] = df['load_factor'].round(4)
df['consumption_per_household'] = df['consumption_per_household'].round(2)

print(f"\nDataset generation completed!")
print(f"Total records: {len(df)}")
print(f"Total areas: {df['area_id'].nunique()}")
print(f"Date range: {df['timestamp'].min()} to {df['timestamp'].max()}")
print(f"Districts covered: {df['district'].nunique()}")
print(f"Suspicious readings: {df['illegal_fence_suspected'].sum()} ({(df['illegal_fence_suspected'].sum()/len(df)*100):.1f}%)")

# Display sample statistics
print(f"\nConsumption Statistics:")
print(f"Average monthly consumption: {df['actual_consumption_kwh'].mean():.1f} kWh")
print(f"Consumption range: {df['actual_consumption_kwh'].min():.1f} - {df['actual_consumption_kwh'].max():.1f} kWh")

print(f"\nArea Type Distribution:")
print(df['area_type'].value_counts())

print(f"\nDistrict Distribution:")
print(df['district'].value_counts())

# Save to CSV
csv_filename = 'kerala_illegal_fence_detection_dataset.csv'
df.to_csv(csv_filename, index=False)
print(f"\nDataset saved as '{csv_filename}'")

# Save metadata as JSON
metadata = {
    'dataset_info': {
        'title': 'Kerala Illegal Electric Fence Detection Dataset',
        'description': 'Synthetic dataset for detecting illegal electric fences in Kerala based on electricity consumption patterns',
        'total_records': len(df),
        'total_areas': df['area_id'].nunique(),
        'date_range': f"{df['timestamp'].min()} to {df['timestamp'].max()}",
        'suspicious_rate': f"{(df['illegal_fence_suspected'].sum()/len(df)*100):.1f}%"
    },
    'features': {
        'geographical': ['district', 'city', 'area_name', 'latitude', 'longitude', 'area_type', 'elevation_meters', 'forest_proximity_km', 'road_accessibility'],
        'infrastructure': ['households', 'distance_to_substation_km', 'transformer_loading_pct', 'connection_quality_score'],
        'temporal': ['year', 'month', 'timestamp', 'is_summer', 'is_monsoon', 'is_winter', 'is_festival_month', 'is_school_holiday'],
        'consumption_patterns': ['expected_consumption_kwh', 'actual_consumption_kwh', 'consumption_deviation_pct', 'consumption_per_household', 'night_consumption_ratio', 'weekend_consumption_ratio'],
        'power_quality': ['voltage_reading_v', 'current_reading_a', 'power_factor', 'voltage_stability_index', 'harmonic_distortion_pct', 'frequency_deviation_hz'],
        'network_performance': ['line_loss_pct', 'power_loss_indicator', 'current_density', 'load_factor'],
        'behavioral_indicators': ['payment_delay_days', 'bill_shock_incidents', 'complaint_history_count', 'meter_tamper_alerts'],
        'historical_analysis': ['yoy_consumption_change_pct', 'consumption_trend_6m', 'consumption_coefficient_of_variation', 'consumption_z_score'],
        'socio_economic': ['income_level', 'agricultural_area', 'commercial_establishments', 'industrial_presence'],
        'security_enforcement': ['inspection_history_count', 'enforcement_actions', 'local_incident_reports'],
        'environmental': ['weather_condition', 'crop_season', 'neighbor_anomaly_count'],
        'target_variable': ['illegal_fence_suspected']
    },
    'consumption_patterns': {
        'rural_avg': f"{df[df['area_type']=='rural']['consumption_per_household'].mean():.1f} kWh/household",
        'semi_urban_avg': f"{df[df['area_type']=='semi-urban']['consumption_per_household'].mean():.1f} kWh/household",
        'urban_avg': f"{df[df['area_type']=='urban']['consumption_per_household'].mean():.1f} kWh/household"
    }
}

with open('dataset_metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

print(f"Metadata saved as 'dataset_metadata.json'")

# Display first few rows
print(f"\nFirst 5 rows of the dataset:")
print(df.head())

print(f"\nDataset columns:")
for i, col in enumerate(df.columns, 1):
    print(f"{i:2d}. {col}")

print(f"\nDataset is ready for machine learning modeling!")
print(f"Use this for:")
print(f"1. Anomaly detection algorithms")
print(f"2. Geospatial analysis and mapping")
print(f"3. Time series analysis")
print(f"4. Classification models")
print(f"5. Visualization of 'yellow zones'")