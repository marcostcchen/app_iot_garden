import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Heading } from 'native-base'
import { styles } from './styles';
import { PlantBundle, PlantCard } from '../../components';

interface Props {
  navigation: any,
}

const DATA = [
  {
    nome: "Beterraba",
    temperatura: 35,
    umidade: 20,
  },
  {
    nome: "Orquidea",
    temperatura: 25,
    umidade: 50
  },
  {
    nome: "Tomate",
    temperatura: 27,
    umidade: 26
  },
];


const DATA_Pacotes = [
  {
    nome: "Hortela Kit",
    price: "3,00"
  },
  {
    nome: "Maça Kit",
    price: "5,00"
  },
  {
    nome: "Alface Kit",
    price: "4,00"
  },
];


export const HomeScreen: React.FC<Props> = (props: Props) => {
  const { navigation } = props;

  const renderItem = ({ item, index }) => {
    let image = require("../../images/plant1.png")
    let rest = index % 3;

    switch (rest) {
      case 0:
        image = require("../../images/plant1.png")
        break;
      case 1:
        image = require("../../images/plant2.png")
        break;
      case 2:
        image = require("../../images/plant3.png")
        break;
    }

    return (
      <>
        {index == 0 && (
          <View style={{ marginLeft: 10 }}>
            <PlantCard
              key={index}
              nome={item.nome}
              temperatura={item.temperatura}
              umidade={item.umidade}
              image={image}
              onPress={() => navigation.navigate("DetalhePlanta", { nome: item.nome })}
            />
          </View>
        )}
        {index != 0 && (
          <PlantCard
            key={index}
            nome={item.nome}
            temperatura={item.temperatura}
            umidade={item.umidade}
            image={image}
            onPress={() => navigation.navigate("DetalhePlanta", { nome: item.nome })}
          />
        )}
      </>
    )
  };

  const renderBundles = ({ item, index }) => {
    let image = require("../../images/plant1.png")
    let rest = index % 3;

    switch (rest) {
      case 0:
        image = require("../../images/plant2.png")
        break;
      case 1:
        image = require("../../images/plant3.png")
        break;
      case 2:
        image = require("../../images/plant1.png")
        break;
    }

    return (
      <>
        {index == 0 && (
          <View style={{ marginLeft: 10 }}>
            <PlantBundle
              key={index}
              nome={item.nome}
              price={item.price}
              image={image}
              onPress={() => navigation.navigate("DetalhePlanta", { nome: item.nome })}
            />
          </View>
        )}
        {index != 0 && (
          <PlantBundle
            key={index}
            nome={item.nome}
            price={item.price}
            image={image}
            onPress={() => navigation.navigate("PacotePlanta", { nome: item.nome })}
          />
        )}
      </>
    )
  };

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
            />
          </View>

          <View style={styles.menuContainer}>
            <Heading style={styles.title}>Pacotes</Heading>
            <FlatList
              horizontal
              data={DATA_Pacotes}
              renderItem={renderBundles}
            />
          </View>
        </View>

      </ScrollView>
    </>
  )
}
