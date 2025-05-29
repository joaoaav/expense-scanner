import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { submitExpense } from '../services/googleSheetsService';
import { ParseImageText } from '../services/ocrService';

type ExpenseData = {
  date: string;
  amount: string;
  description: string;
  paidBy?: 'Rafael' | 'João';
  split?: boolean;
};

const ScanScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [expenseData, setExpenseData] = useState<ExpenseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [paidBy, setPaidBy] = useState<'Rafael' | 'João'>('Rafael');
  const [split, setSplit] = useState(true);

  // Pick or take photo
  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'We need permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    /*let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });*/

    if (!result.canceled) {
      if (Platform.OS === 'web') {
        // Use Base64 directly on the web
        console.log('result:', result);
        let base64Data = result.assets[0].uri;
        console.log('Base64 data:', base64Data);
        setImageUri(base64Data);
      } else {
        // Save Base64 as a file on native platforms
        let base64Data = result.assets[0].base64;
        if (!base64Data) {
          Alert.alert('Error', 'Failed to retrieve image data');
          return;
        }
        const fileUri = `${FileSystem.cacheDirectory}temp_image.jpg`;

        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        setImageUri(fileUri);
      }
      setExpenseData(null);
    }
  }

  async function TakePhoto() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera access is required to take a photo");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setExpenseData(null);
    }
  };

  async function callOcrApi(imageUri: string) {
    setLoading(true);
    try {
      var imageParsed = await ParseImageText(imageUri);
      
      setTimeout(() => {
        setExpenseData({
          date: imageParsed.date || new Date().toISOString().split('T')[0],
          amount: imageParsed.value,
          description: imageParsed.description,
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      Alert.alert('OCR Error', 'Failed to parse receipt');
      setLoading(false);
    }
  }

  async function sendExpense(expenseData: ExpenseData) {
    setLoading(true);
    try {
      await submitExpense(expenseData);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error sending expense to Google Sheets');
      setLoading(false);
    }
  }

  function onProcessReceipt() {
    if (!imageUri) {
      Alert.alert('No Image', 'Please pick an image first');
      return;
    }
    callOcrApi(imageUri);
  }

  async function SaveExpense() {
    if (!expenseData) {
      Alert.alert('No expense data');
      return;
    }

    expenseData.paidBy = paidBy;
    expenseData.split = split;
    
    await sendExpense(expenseData);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* <Button title="Pick Receipt Photo" onPress={pickImage} /> */}
        <Button title="Take Photo of Receipt" onPress={TakePhoto} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <Button title="Process Receipt" onPress={onProcessReceipt} disabled={!imageUri || loading} />

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {expenseData && (
          <View style={styles.form}>
            <Text>Date:</Text>
            <TextInput style={styles.input} value={expenseData.date} onChangeText={(d) => setExpenseData({ ...expenseData, date: d })} />

            <Text>Amount:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={expenseData.amount}
              onChangeText={(a) => setExpenseData({ ...expenseData, amount: a })}
            />

            <Text>Description:</Text>
            <TextInput
              style={styles.input}
              value={expenseData.description}
              onChangeText={(desc) => setExpenseData({ ...expenseData, description: desc })}
            />

            <Text>Paid by:</Text>
            <View style={styles.paidByContainer}>
              <Button title="Rafael" onPress={() => setPaidBy('Rafael')} color={paidBy === 'Rafael' ? 'blue' : undefined} />
              <Button title="João" onPress={() => setPaidBy('João')} color={paidBy === 'João' ? 'blue' : undefined} />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>Split Expense?</Text>
              <Button title={split ? 'Yes' : 'No'} onPress={() => setSplit(!split)} />
            </View>

            <Button
              title="Save Expense"
              onPress={SaveExpense}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginVertical: 20 },
  form: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 5,
    borderRadius: 4,
  },
  paidByContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});