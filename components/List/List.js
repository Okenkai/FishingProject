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

    useEffect(() => {
        ApiService.fetchTide()
            .then(data => {
                const tide = new Tide(data);
                const tideData = tide.getTide();
                setTideArray(tideData);
                console.log('High tides for today:', tideData[0]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const renderItem = tideArray.map(item =>
        <View style={styles.item}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.date}</Text>
            </View>
            <View style={styles.cell}>
                {item.hour.map(h => <Text style={styles.title}>{h}</Text>)}
            </View>
            <View style={styles.cell}>
                {item.height.map(he => <Text style={styles.title}>{he}</Text>)}
            </View>
            <View style={styles.cell}>
                {item.coeff.map(c => <Text style={styles.title}>{c}</Text>)}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderItem}
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
