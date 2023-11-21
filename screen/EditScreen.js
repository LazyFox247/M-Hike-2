import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { RadioButton, Switch } from 'react-native-paper';

const db = SQLite.openDatabase('db.hike');

const EditScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const { id, name, location, doh, pa, loh, lod, description } = route.params;

  const [edit_id,setEditId]=useState();
  const [edit_name, setEditName] = useState('');
  const [edit_location, setEditLocation] = useState('');
  const [edit_doh,setEditDoh]=useState();
  const [edit_pa, setEditPa] = useState('');
  const [edit_loh, setEditLoh] = useState('');
  const [edit_lod, setEditLod] = useState('');
  const [edit_description, setEditDescription] = useState('');

  useEffect(()=>{
    setEditId(id);
    setEditName(name);
    setEditLocation(location);
    setEditDoh(doh);
    setEditPa(pa);
    setEditLoh(loh);
    setEditLod(lod);
    setEditDescription(description);

    console.log(edit_id+">>"+edit_name+">>"+edit_location+">>"+edit_doh+">>"+edit_pa+">>"+edit_loh+">>"+edit_lod+">>"+edit_description);
  },[]);

  const editContact = () => {

    db.transaction((txn) => {
        txn.executeSql(
            'update hike set name=?, location=?, doh=?, pa=?, loh=?, lod=?, description=? where id=?',
            [edit_name,edit_location,edit_doh,edit_pa,edit_loh,edit_loh,edit_lod,edit_id],
            (tx, results) => { navigation.navigate("Show") },
             //{ Alert.alert('Updated','Successfully updated!') },
            (tx, error) => { console.log('Updation error:' + error.message) }
        )
    }) 
  }

  return (
    <View>

      <Text style={{ fontSize: 36 }}>Edit Hike</Text>

            <TextInput style={styles.input}
                placeholder='Name of Hike'
                value={edit_name}
                onChangeText={setEditName} />

            <TextInput style={styles.input}
                placeholder='Location'
                value={edit_location}
                onChangeText={setEditLocation} />

             <TextInput style={styles.input}
                placeholder='Date of Hike'
                value={edit_doh}
                onChangeText={setEditDoh}/>

            <RadioButton.Group onValueChange={newValue => setEditPa(newValue)} value={edit_pa}>
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

             <TextInput style={styles.input}
                placeholder='length of Hike'
                value={edit_loh}
                onChangeText={setEditLoh} />

            <TextInput style={styles.input}
                placeholder='Level of Difficulty'
                value={edit_lod}
                onChangeText={setEditLod} />

            <TextInput style={styles.input}
                placeholder='Description'
                value={edit_description}
                onChangeText={setEditDescription}/>

      <Button title="Edit Contact" onPress={() => { editContact() }} />


    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    borderWidth: 2,
    borderColor: 'gray',
    padding: 5,
    margin: 10,
    fontSize: 20,
    borderRadius: 5,
  }
}
)

export default EditScreen;
