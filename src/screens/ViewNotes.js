import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
import Header from '../components/Header';
import { useQuery, useMutation, gql } from '@apollo/client';

const ADD_NOTE = gql`
  mutation AddNote($title: String! $body: String!) {
    addNote(title: $title body: $body) @client {
      id
      title
      body
    }
  }
`
const GET_NOTES = gql`
  {
    notes @client {
      id
      title
      body
    }
  }
`

function ViewNotes({ navigation }) {
  const [addNote] = useMutation(ADD_NOTE);
  const { data } = useQuery(GET_NOTES);

  return (
    <>
      <Header titleText='Simple Note Taker' />
      <View style={styles.container}>
        {data.notes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any notes</Text>
          </View>
        ) : (
            <FlatList
              data={data.notes}
              renderItem={({ item }) => {
                console.log(item)
                return (
                  <List.Item
                    title={item.title}
                    description={item.body}
                    descriptionNumberOfLines={1}
                    titleStyle={styles.listTitle}
                  />
                )
              }}
              keyExtractor={({ id }) => id.toString()}
            />
          )}
        <FAB
          style={styles.fab}
          small
          icon='plus'
          label='Add new note'
          onPress={() =>
            navigation.navigate('AddNotes', {
              addNote
            })
          }
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