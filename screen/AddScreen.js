import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { RadioButton, Switch } from 'react-native-paper';

const db = SQLite.openDatabase('db.hike');

const AddScreen = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [doh, setDoh] = useState('');
    const [pa, setPa] = useState('yes');
    const [loh, setLoh] = useState('');
    const [lod, setLod] = useState('');
    const [description, setDescription] = useState('');

    const addHike = () => {
        
        console.log('In Add Hike');

        if(!name) {
            Alert.alert('Name Required', 'Name of Hike');
            return;
        }
        if(!location){
            Alert.alert('location Required', 'Location');
            return;
        }
        if(!doh) {
            Alert.alert('doh Required', 'Date of Hike');
            return;
        }
        if(!pa){
            Alert.alert('pa Required', 'Parking');
            return;
        }
        if(!loh) {
            Alert.alert('loh Required', 'Length of Hike');
            return;
        }
        if(!lod){
            Alert.alert('lod Required', 'Level of Difficulty');
            return;
        }
        if(!description){
            Alert.alert('', 'Description');
            return;
        }

        db.transaction((txn) => {
            txn.executeSql(
                'insert into hike(name, location, doh, pa, loh, lod, description) values(?,?,?,?,?,?,?)',
                [name, location, doh, pa, loh, lod, description],
                (tx, results) => { 
                    setName('');
                    setLocation('');
                    setDoh('');
                    setPa('');
                    setLoh('');
                    setLod('');
                    setDescription('');
                    Alert.alert('Adding Hike', 'Successfully saved!');
                 },
                (tx, error) => { console.log('Error in saving hike:' + error.message) }
            )
        }
        )
    }

    return (
        <View>
            <Text style={{fontSize: 36}}>M-Hike</Text>

            <TextInput style={styles.input}
                placeholder='Name of Hike'
                value={name}
                onChangeText={setName} />

            <TextInput style={styles.input}
                placeholder='Location'
                value={location}
                onChangeText={setLocation} />

             <TextInput style={styles.input}
                placeholder='Date of Hike'
                value={doh}
                onChangeText={setDoh}/>
            <View style={styles.text}>
            <Text style={{fontSize: 30}}>Parking</Text>
            <RadioButton.Group onValueChange={newValue => setPa(newValue)} value={pa}>
            <View style={styles.rowContainer}>
            <View style={styles.rowContainer}>
            <Text style={{ fontSize: 20 }}>Yes</Text>
            <RadioButton value="yes" />
             </View>
            <View style={styles.rowContainer}>
            <Text style={{ fontSize: 20 }}>No</Text>
            <RadioButton value="no" />
             </View>
             </View>
             </RadioButton.Group>
             </View>
             <TextInput style={styles.input}
                placeholder='length of Hike'
                value={loh}
                onChangeText={setLoh} />

            <TextInput style={styles.input}
                placeholder='Level of Difficulty'
                value={lod}
                onChangeText={setLod} />

            <TextInput style={styles.input}
                placeholder='Description'
                value={description}
                onChangeText={setDescription}/>

            <Button title="Add Hike" onPress={addHike} />


        </View>
    )
}

const styles=StyleSheet.create({
    input:{
        width: '90%',
        borderWidth: 2,
        borderColor: 'gray',
        padding: 5,
        margin: 10,
        fontSize: 20,
        borderRadius: 5,
    },
    rowContainer: {
       
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}   
)

export default AddScreen;