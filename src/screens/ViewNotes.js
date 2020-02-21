import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
import Header from '../components/Header';

function ViewNotes({ navigation }) {
  const [notes, setNotes] = React.useState([]);

  const addNote = note => {
    note.id = notes.length + 1;
    setNotes([
      ...notes,
      note
    ])
  }
  return (
    <>
      <Header titleText="Simple Note Taker" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {
            notes.length === 0
              ? (
                <View>
                  <Text style={styles.title}>You do not have any notes</Text>
                </View>
              )
              : (
                <FlatList
                  data={notes}
                  renderItem={({ item }) => {
                    <List.Item
                      title={item.noteTitle}
                      description={item.noteValue}
                      titleStyle={styles.listTitle}
                    />
                  }}

                  keyExtractor={item => item.id.toString()}
                />
              )
          }

        </View>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Add new note"
          onPress={() => navigation.navigate('AddNotes', {
            addNote
          })}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  },
  listStyle: {
    fontSize: 20
  }
})

export default ViewNotes;