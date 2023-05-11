import { MNKVLoader, useMNKVStorage } from 'react-native-mnkv-storage';

const storage = new MNKVLoader().initialize();

const [value, setValue] = useMNKVStorage('key', storage);

