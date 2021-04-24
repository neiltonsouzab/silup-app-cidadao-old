import React, { useState, useCallback } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as RNFS from 'react-native-fs';

import { Container, Label, PreviewContainer, PreviewImage } from './styles';

interface ImageProps {
  name: string;
  uri: string;
}

interface InputImageProps {
  label: string;
  onImageCapture?(image: ImageProps): void;
}

const InputImage: React.FC<InputImageProps> = ({ label, onImageCapture }) => {
  const [imagePreview, setImagePreview] = useState('');

  const handleUploadImage = useCallback(async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();

    if (!camera.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const filename = `${new Date().getTime()}.jpg`;
      const dirPath = `${RNFS.ExternalCachesDirectoryPath}/images`;
      const filePath = `${dirPath}/${filename}`;

      await RNFS.mkdir(dirPath);

      await RNFS.writeFile(filePath, result.base64 || '', 'base64');

      setImagePreview(result.uri);

      onImageCapture && onImageCapture({ name: filename, uri: result.uri });
    }
  }, [onImageCapture]);

  if (imagePreview) {
    return (
      <PreviewContainer onPress={handleUploadImage}>
        <PreviewImage source={{ uri: imagePreview }} />
      </PreviewContainer>
    );
  }

  return (
    <Container onPress={handleUploadImage}>
      <FontAwesome5 size={24} color="#2e8c24" name="camera" />
      <Label>{label}</Label>
    </Container>
  );
};

export default InputImage;
