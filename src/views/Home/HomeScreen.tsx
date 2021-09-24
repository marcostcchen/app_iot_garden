import React from 'react';
import { View, ScrollView, Text, RefreshControl, FlatList } from 'react-native';
import { Heading } from 'native-base'
import { styles } from './styles';
import { PlantCard } from '../../components';

interface Props {
  navigation: any,
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export const HomeScreen: React.FC<Props> = (props: Props) => {
  const renderItem = ({ item, index }) => (
    <>
      {index == 0 && (
        <View style={{ marginLeft: 10 }}>
          <PlantCard />
        </View>
      )}
      <PlantCard />
    </>
  );

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={{ width: '100%', marginTop: 20 }}>
          <View style={styles.menuContainer}>
            <Heading style={styles.title}>Minhas Plantas</Heading>
            <FlatList
              horizontal
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={styles.menuContainer}>
            <Heading style={styles.title}>Pacotes</Heading>
          </View>
        </View>

      </ScrollView>
    </>
  )
}
