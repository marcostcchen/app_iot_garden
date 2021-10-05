import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Heading, Toast } from 'native-base'
import { styles } from './styles';
import { PlantBundle, PlantCard } from '../../components';
import { Pacote } from '../../models';
import * as fetchUtils from './fetch';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

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



export const HomeScreen: React.FC<Props> = (props: Props) => {
  const { navigation } = props;
  const [pacotes, setPacotes] = useState<Array<Pacote>>([]);
  const [isLoadingPlantas, setIsLoadingPlantas] = useState(true);
  const [isLoadingPacotes, setIsLoadingPacotes] = useState(true);

  useEffect(() => {
    getPacotes();
    getPlantas();
  }, [])

  const getPacotes = async () => {
    const pacotes = await fetchUtils.getBundles();

    if (pacotes == null) {
      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar os pacotes!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    setPacotes(pacotes);
    setTimeout(() => {
      setIsLoadingPacotes(false);
    }, 1000)
  }

  const getPlantas = async () => {

    setTimeout(() => {
      setIsLoadingPlantas(false);
    }, 1000)
  }

  const renderItem = ({ item, index }) => {
    let image = require("../../images/plant1.png")
    let imageName = "plant1.png";
    let rest = index % 3;

    switch (rest) {
      case 0:
        image = require("../../images/plant1.png")
        imageName = "plant1.png";
        break;
      case 1:
        image = require("../../images/plant2.png")
        imageName = "plant2.png";
        break;
      case 2:
        image = require("../../images/plant3.png")
        imageName = "plant3.png";
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
              onPress={() => navigation.navigate("DetalhePlanta", { planta: item, image: imageName })}
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
            onPress={() => navigation.navigate("DetalhePlanta", { planta: item, image: imageName })}
          />
        )}
      </>
    )
  };

  const renderBundles = ({ item, index }) => {
    let image = require("../../images/plant1.png")
    let imageName = "plant1.png";
    let rest = index % 3;

    switch (rest) {
      case 0:
        image = require("../../images/plant2.png")
        imageName = "plant2.png";
        break;
      case 1:
        image = require("../../images/plant3.png")
        imageName = "plant3.png";
        break;
      case 2:
        image = require("../../images/plant1.png")
        imageName = "plant1.png";
        break;
    }

    return (
      <>
        {index == 0 && (
          <View style={{ marginLeft: 10 }}>
            <PlantBundle
              key={index}
              nome={item.especie}
              price={item.preco}
              image={image}
              onPress={() => navigation.navigate("PacotePlanta", { pacote: item, image: imageName })}
            />
          </View>
        )}
        {index != 0 && (
          <PlantBundle
            key={index}
            nome={item.especie}
            price={item.preco}
            image={image}
            onPress={() => navigation.navigate("PacotePlanta", { pacote: item, image: imageName })}
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

            {isLoadingPlantas && (
              <View style={{ height: 240, justifyContent: 'center' }}>
                <SkeletonPlaceholder highlightColor="rgba(4, 255, 4, 0.108)">
                  <SkeletonPlaceholder.Item flexDirection="row" >
                    <SkeletonPlaceholder.Item width={150} marginLeft={10} height={200} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={150} marginLeft={10} height={200} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={150} marginLeft={10} height={200} borderRadius={10} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            )}

            {!isLoadingPlantas && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={DATA}
                renderItem={renderItem}
              />
            )}
          </View>

          <View style={styles.menuContainer}>
            <Heading style={styles.title}>Pacotes</Heading>

            {isLoadingPacotes && (
              <View style={{ height: 240, justifyContent: 'center' }}>
                <SkeletonPlaceholder highlightColor="rgba(4, 255, 4, 0.108)">
                  <SkeletonPlaceholder.Item flexDirection="row" >
                    <SkeletonPlaceholder.Item width={150} marginLeft={10} height={200} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={150} marginLeft={10} height={200} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={150} marginLeft={10} height={200} borderRadius={10} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            )}

            {!isLoadingPacotes && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={pacotes}
                renderItem={renderBundles}
              />
            )}
          </View>
        </View>

      </ScrollView>
    </>
  )
}
