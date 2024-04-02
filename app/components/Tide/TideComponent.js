import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#808080",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: true // optional
};


const TideComponent = ({ tide, date }) => {
    const [activeTide, setActiveTide] = useState(null);
    const [tidesLength, setTidesLength] = useState(0);

    useEffect(() => {
        if (tide) {
            const tideByDate = tide.getTideByDate(date);
            setActiveTide(tideByDate);
        }
    }, [date, tide]);

    useEffect(() => {
        if (activeTide) {
            setTidesLength(activeTide.tides.length);
        }
    }, [activeTide]);

    if (!activeTide) {
        return <Text>Loading...</Text>;
    }

    const coeffContainerStyle = {
        margin: 16,
        maxHeight: tidesLength === 3 ? 100 : 128,
    };

    const tideItems = activeTide.tides.map((tide, index) => (
        <View key={index} style={index === 1 ? [styles.tideItem, styles.tideItemUnderline] : styles.tideItem}>
            <View style={styles.tideColumn}>
                <Text style={styles.tideHour}>{tide.hour}</Text>
            </View>
            <View style={styles.tideColumn}>
                <Text style={styles.tideHeight}>{tide.height}</Text>
            </View>
            <View style={tidesLength === 3 && index === 2 ? styles.tideColumn : styles.tideColumnCoeff}>
                {index % 2 === 0 && <Text style={tidesLength === 3 && index === 2 ? styles.tideHeight : styles.tideCoeff}>{tide.coeff}</Text>}
            </View>
        </View>
    ));

    return (
        <View style={styles.container}>
            <LineChart
                data={{
                    labels: activeTide.tides.map(tide => tide.hour),
                    datasets: [
                        {
                            data: activeTide.tides.map(tide => parseInt(tide.height.replace(/m/g, ','), 10))
                        }
                    ],
                    legend: ["Hauteurs en mètres"]
                }}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                    margin: 16,
                    borderRadius: 8,
                }}
            />
            <View style={coeffContainerStyle}>
                <Text style={styles.coeffTitle}>Coefficients</Text>
                <View style={styles.coeffContentContainer}>
                    <LinearGradient
                        colors={['rgba(128, 128, 128, 0)', 'rgba(255,255,255,0.5)']}
                        start={[0, 1]}
                        end={[1, 0]}
                        style={styles.gradient}
                    />
                    <View>{tideItems}</View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16,
    },
    coeffTitle: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    coeffContentContainer: {
        position: 'relative',
        marginTop: 12,
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    tideItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    tideItemUnderline: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    },
    tideColumn: {
        flex: 1,
        alignItems: 'center',
    },
    tideColumnCoeff: {
        flex: 1,
        position: 'relative',
    },
    tideHour: {
        color: '#fff',
        fontSize: 12,
    },
    tideHeight: {
        color: '#fff',
        fontSize: 12,
    },
    tideCoeff: {
        color: '#fff',
        fontSize: 12,
        position: 'absolute',
        top: 8,
        left: 44
    },
});

export default TideComponent;
