import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import Tide from '../../data/Tide';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#A0E7E5",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 25, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const TideComponent = () => {
    const [tideArray, setTideArray] = useState([]);

    useEffect(() => {
        ApiService.fetchTide()
            .then(data => {
                const tide = new Tide(data);
                const tideData = tide.getTide();
                setTideArray(tideData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const renderChart = tideArray.map((item, index) => {

        const tideHours = item.tides.map(tide => tide.hour);
        const tideCoeffs = item.tides.map(tide => parseInt(tide.height.replace(/m/g, ','), 10));
        return (
            <View key={`${item.date}_${index}_main`}>
                <LineChart
                    key={index}
                    data={{
                        labels: tideHours,
                        datasets: [
                            {
                                data: tideCoeffs
                            }
                        ],
                        legend: [`${item.day}.${item.date}`]
                    }}
                    width={screenWidth}
                    height={256}
                    chartConfig={chartConfig}
                    bezier
                />
                <View key={`${item.date}_${index}`} style={styles.item}>
                    <View key={`${item.date}_${item.day}`} style={styles.item}>
                        <Text style={styles.text}>{item.day}.{item.date}</Text>
                        <View style={styles.cell}>
                            {item.tides.map(element => (
                                <View style={styles.item} key={`${element.hour}_${element.height}_${element.coeff}`}>
                                    <Text style={styles.text}>{element.hour}</Text>
                                    <Text style={styles.text}>{element.height}</Text>
                                    <Text style={styles.text}>{element.coeff}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        );
    });



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
            <ScrollView>
                <Text style={styles.title}>Marées</Text>
                {renderChart}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 4,
    },
    cell: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        margin: 4,
    },
    title: {
        flex: 1,
        margin: 16,
        textAlign: 'center',
        color: '#000',
        fontSize: 28,
    },
});

export default TideComponent;
