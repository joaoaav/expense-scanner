import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { parseReceiptText } from '../utils/parseReceiptText';

interface ExtraConfig {
  OCR_API_KEY: string;
}

export async function ParseImageText(uri: string) {
  const { OCR_API_KEY } = (Constants.expoConfig?.extra as ExtraConfig) || {};

  const compressed = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );

  const base64 = await FileSystem.readAsStringAsync(compressed.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

  const formData = new FormData();
    formData.append('base64Image', `data:image/jpg;base64,${base64}`);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');

  const response = await fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    headers: { apikey: OCR_API_KEY },
    body: formData,
  });

  const result = await response.json();

  const rawText = result?.ParsedResults?.[0]?.ParsedText || '';
  return parseReceiptText(rawText);
}