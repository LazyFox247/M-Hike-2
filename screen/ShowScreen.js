import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const db = SQLite.openDatabase('db.hike');


const ShowScreen = () => {


    const navigation = useNavigation();

    const isFocused = useIsFocused();

    const [contactList, setContactList] = useState([]);

    useEffect(() => createTable, []);

    useEffect(() => showAllContacts, [isFocused]); // [contactList] //[isFocused]

    const createTable = () => {

        db.transaction((txn) => {
            txn.executeSql(
                'create table if not exists hike' +
                '(id integer primary key autoincrement, name text, location text, doh text, pa text, loh text, lod text, description text)',
                [],
                (tx, results) => { console.log("Hike Table Created!"); },
                (tx, error) => { console.log('Error in creating table' + error.message); }
            )
        }
        );
    } //create table

    const showAllContacts = () => {
        console.log('Show All Hike');

        db.transaction((txn) => {
            txn.executeSql('select * from hike',
                [],
                (tx, results) => {
                    console.log('No of records:' + results.rows.length);

                    let temp = [];//for each record

                    for (let i = 0; i < results.rows.length; i++) {
                        temp.push(results.rows.item(i));
                        console.log(results.rows.item(i));//id name
                    }
                    setContactList(temp);
                },
                (tx, error) => { console.log('Error in showing hike:' + error.message); })
        })
    }//show 


    /////// delete contact ////////

    const confirmAlert = (contact_id) => {

        Alert.alert('Confirmation',
            'Are you sure you want to delete it?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Pressed NO')
                },
                {
                    text: 'YES',
                    onPress: () => deleteContact(contact_id)
                }
            ]
        );
    }

    const deleteContact = (contact_id) => {

        console.log('Delete Contact for: ' + contact_id);

        db.transaction((txn) => {
            txn.executeSql(
                'delete from hike where id=?',
                [contact_id],
                (tx, results) => {

                    Alert.alert('Deleted', 'Successfully deleted!');

                    showAllContacts();
                },
                (tx, error) => { console.log('Deletion error:' + error.message) }
            )
        })

    }

    /////////////// Update Contact ///////////////

    const updateContact = (item) => {

        console.log('Update contact: ' + item.id + ' >> ' + item.name + ' >> ' + item.location + ' >> ' + item.doh + ' >> ' + item.pa + ' >> ' + item.loh
        + ' >> ' + item.lod + ' >> ' + item.description);//existing values

        navigation.navigate('Edit', {
            id: item.id,
            name: item.name,
            location: item.location,
            doh: item.doh,
            pa: item.pa,
            loh: item.loh,
            lod: item.lod,
            description: item.description,
        });
    }

    ///////////////////////////////////////////

    const showItem = (item) => {

        console.log('Show Item');

        return (
            <View style={styles.item}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <Text>{item.location}</Text>
                <Text>{item.doh}</Text>
                <Text>{item.pa}</Text>
                <Text>{item.loh}</Text>
                <Text>{item.lod}</Text>
                <Text>{item.description}</Text>
                {/* <Text>{item.id}</Text> */}

                <View style={styles.buttons}>

                    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => { updateContact(item) }}>
                        <MaterialCommunityIcons name='book-edit' color={'green'} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => confirmAlert(item.id)}>
                        <MaterialCommunityIcons name='delete' color={'red'} size={24} />
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36 }}>Hike List</Text>

            <FlatList
                style={{ marginBottom: 50 }}
                data={contactList}
                renderItem={({ item }) => showItem(item)}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 20,
        width: '100%',
    },
    item: {
        width: '100%',
        margin: 10,
        padding: 10,
        backgroundColor: 'skyblue',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }

})

export default ShowScreen; 