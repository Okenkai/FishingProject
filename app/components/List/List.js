import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import Tide from '../../data/Tide';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';

const List = () => {
    const [tideArray, setTideArray] = useState([]);
    const [bestTide, setBestTide] = useState();

    useEffect(() => {
        ApiService.fetchTide()
            .then(data => {
                const tide = new Tide(data);
                const tideData = tide.getTide();
                setTideArray(tideData);
                console.log(data);
                // const bestDay = tide.findBestFishingDay(data);
                // console.log(bestDay);
                // setBestTide(bestDay);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const renderItem = tideArray.map((item, index) => (
        <View key={`${item.date}_${index}`} style={styles.item}>
            <View key={`${item.date}_${item.day}`} style={styles.item}>
                <Text style={styles.title}>{item.day}{item.date}</Text>
                {item.tides.map(element => (
                    <View style={styles.cell} key={`${element.hour}_${element.height}_${element.coeff}`}>
                        <Text style={styles.title}>{element.hour}</Text>
                        <Text style={styles.title}>{element.height}</Text>
                        <Text style={styles.title}>{element.coeff}</Text>
                    </View>
                ))}
            </View>
        </View>
    ));


    return (
        <SafeAreaView style={styles.container}>
            {renderItem}
            {/* <Text style={styles.item}>{bestTide}</Text> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    cell: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        margin: 4,
    },
});

export default List;
