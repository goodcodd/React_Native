import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisiable, setModalIsVisiable] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisiable(true);
  }

  function endAddGoalHandler() {
    setModalIsVisiable(false);
  }

  function addIGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button 
          title='Add new goal' 
          color="#b180f0"
          onPress={startAddGoalHandler}  
        />
        <GoalInput 
          visible={modalIsVisiable} 
          onAddGoal={addIGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals} 
            renderItem={itemData => (
              <GoalItem 
                text={itemData.item.text} 
                id={itemData.item.id} 
                onDeleteItem={deleteGoalHandler} />
            )}
            keyExtractor={item => item.id}
            alwaysBounceVertical={false} 
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  goalsContainer: {
    flex: 4,
  },
});
