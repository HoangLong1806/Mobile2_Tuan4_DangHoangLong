import React, { useRef, useState } from 'react';
import { Animated, Text, Image, View, StyleSheet, Button, SafeAreaView } from 'react-native';

const App = () => {
  const [isFadedIn, setIsFadedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [deleteButtonColor, setDeleteButtonColor] = useState('gray');
  const [imageColor, setImageColor] = useState('transparent');
  const spinValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    setIsFadedIn(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    setIsFadedIn(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const resetColor = () => {
    setIsFadedIn(false);
    setIsEditMode(false);
    setDeleteButtonColor('gray');
    setImageColor('transparent');
  };

  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };

  const handleEditImage = () => {
    setImageColor(generateRandomColor());
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start(() => {
      spinValue.setValue(0);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const containerStyle = {
    ...styles.fadingContainer,
    backgroundColor: isEditMode
      ? generateRandomColor()
      : fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['powderblue', 'skyblue'],
        }).toString(),
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={containerStyle}>
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        {!isFadedIn ? (
          <Button title="Fade In View" onPress={fadeIn} />
        ) : (
          <Button title="Fade Out View" onPress={fadeOut} />
        )}
        <Button
          title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          onPress={() => setIsEditMode((prevState) => !prevState)}
        />
        <Button
          title="Reset Color"
          onPress={resetColor}
          disabled={!isFadedIn && !isEditMode}
        />
        <Button
          title="Delete"
          onPress={() => setDeleteButtonColor(generateRandomColor())}
          color={deleteButtonColor}
        />
        <Button title="Edit Image" onPress={handleEditImage} />
      </View>
      <Animated.View
        style={{
          width: 200,
          height: 200,
          transform: [{ rotate: spin }],
          backgroundColor: imageColor,
        }}
      >
       
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default App;
