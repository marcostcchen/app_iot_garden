import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Heading, Toast } from 'native-base'
import { styles } from './styles';
import { PlantBundle, PlantCard } from '../../components';
import { Planta, PlantaUsuario } from '../../models';
import * as fetchUtils from './fetch';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyPlantsConstant } from '../../utils/storedConstants';

interface Props {
  navigation: any,
}

export const HomeScreen: React.FC<Props> = (props: Props) => {
  const { navigation } = props;
  const [pacotes, setPacotes] = useState<Array<Planta>>([]);
  const [plantas, setPlantas] = useState<Array<any>>([]);
  const [isLoadingPlantas, setIsLoadingPlantas] = useState(true);
  const [isLoadingPacotes, setIsLoadingPacotes] = useState(true);

  useEffect(() => {
    getPlantas();
    getPacotes();
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
    const plants:Array<PlantaUsuario> = [
      {
        nome: "Beterraba",
        temperatura: "35",
        umidadeAr: "20",
        luminosidade: "30",
        umidadeSolo: "40",
        temperaturaMinima: "20",
      },
      {
        nome: "Orquidea",
        temperatura: "25",
        luminosidade: "30",
        umidadeSolo: "40",
        umidadeAr: "50",
        temperaturaMinima: "20",

      },
      {
        nome: "Tomate",
        temperatura: "27",
        luminosidade: "30",
        umidadeSolo: "40",
        umidadeAr: "26",
        temperaturaMinima: "20",
      },
    ];
    
    await AsyncStorage.setItem(MyPlantsConstant, JSON.stringify(plants))

    setTimeout(() => {
      setPlantas(plants);
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
              onPress={() => navigation.navigate("DetalhePlanta", { plantaUsuario: item, image: imageName })}
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
            onPress={() => navigation.navigate("DetalhePlanta", { plantaUsuario: item, image: imageName })}
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
              onPress={() => navigation.navigate("PacotePlanta", { planta: item, image: imageName })}
            />
          </View>
        )}
        {index != 0 && (
          <PlantBundle
            key={index}
            nome={item.especie}
            price={item.preco}
            image={image}
            onPress={() => navigation.navigate("PacotePlanta", { planta: item, image: imageName })}
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
                    <SkeletonPlaceholder.Item width={155} marginLeft={20} height={210} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={155} marginLeft={10} height={210} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={155} marginLeft={10} height={210} borderRadius={10} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            )}

            {!isLoadingPlantas && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={plantas}
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
                    <SkeletonPlaceholder.Item width={155} marginLeft={20} height={230} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={155} marginLeft={10} height={230} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={155} marginLeft={10} height={230} borderRadius={10} />
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
