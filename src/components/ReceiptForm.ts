import { useState } from 'react';
import { Button, Picker, TextInput, View } from 'react-native';
import { submitExpense } from '../services/googleSheetsService';

export default function ReceiptForm({ initialData }) {
  const [form, setForm] = useState({
    ...initialData,
    whoPaid: 'rafael',
    split: true
  });

  return (
    <View>
      <TextInput placeholder="Date" value={form.date} onChangeText={(text) => setForm({ ...form, date: text })} />
      <TextInput placeholder="Value" value={form.value} onChangeText={(text) => setForm({ ...form, value: text })} />
      <TextInput placeholder="Description" value={form.description} onChangeText={(text) => setForm({ ...form, description: text })} />
      <Picker selectedValue={form.whoPaid} onValueChange={(v) => setForm({ ...form, whoPaid: v })}>
        <Picker.Item label="Rafael" value="Rafael" />
        <Picker.Item label="João" value="João" />
      </Picker>
      <Picker selectedValue={form.split} onValueChange={(v) => setForm({ ...form, split: v === 'true' })}>
        <Picker.Item label="Split" value="true" />
        <Picker.Item label="Not Split" value="false" />
      </Picker>
      <Button title="Submit Expense" onPress={() => submitExpense(form)} />
    </View>
  );
}