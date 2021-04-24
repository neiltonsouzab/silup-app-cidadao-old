import * as RNFS from 'react-native-fs';

import firebaseStorage from '@react-native-firebase/storage';

export default {
  async uploadFile(filename: string): Promise<string> {
    try {
      const path = `${RNFS.ExternalCachesDirectoryPath}/images/${filename}`;

      const reference = firebaseStorage().ref(
        `/ImagensOcorrencias/${filename}`,
      );

      await reference.putFile(path);

      return reference.getDownloadURL();
    } catch {
      throw new Error('Erro no upload da imagem.');
    }
  },
};
