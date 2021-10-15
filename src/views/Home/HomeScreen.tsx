import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Heading, Toast } from 'native-base'
import { styles } from './styles';
import { PlantBundle, PlantCard } from '../../components';
import { Planta, User } from '../../models';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyPlantsConstant, apiUrl, UserConstant, fetchUtils } from '../../utils';

interface Props {
  navigation: any,
}

export const HomeScreen: React.FC<Props> = (props: Props) => {
  const { navigation } = props;
  const [plant, setPlants] = useState<Array<Planta>>([]);
  const [userPlants, setUserPlants] = useState<Array<any>>([]);
  const [isLoadingUserPlants, setIsLoadingUserPlants] = useState(true);
  const [isLoadingPlants, setIsLoadingPlants] = useState(true);

  useEffect(() => {
    getUserPlants();
    getPlants();
  }, [])

  const getPlants = () => {
    const path = 'plants';

    const successFunc = (res) => {
      const plant = res;
      setPlants(plant);
      setTimeout(() => {
        setIsLoadingPlants(false);
      }, 1000)
    }

    const errorFunc = (err) => {
      setIsLoadingPlants(false);
      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar os plant!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    fetchUtils().getJSON(`${apiUrl}/${path}`)
      .then(successFunc)
      .catch(errorFunc);
  }

  const getUserPlants = async () => {
    const userString = await AsyncStorage.getItem(UserConstant);
    if (userString == null) {
      setIsLoadingPlants(false);
      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar as suas plantas!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    const user: User = JSON.parse(userString);
    const path = `user/${user.id}/plants`;

    const successFunc = async (res) => {
      const userPlants = res;
      await AsyncStorage.setItem(MyPlantsConstant, JSON.stringify(userPlants))

      setTimeout(() => {
        setUserPlants(userPlants);
        setIsLoadingUserPlants(false);
      }, 1000)
    }

    const errorFunc = (err) => {
      setIsLoadingPlants(false);
      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar as suas plantas!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    fetchUtils().getJSON(`${apiUrl}/${path}`)
      .then(successFunc)
      .catch(errorFunc);
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
              onPress={() => navigation.navigate("DetalhePlanta", { UsuarioPlanta: item, image: imageName })}
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
            onPress={() => navigation.navigate("DetalhePlanta", { UsuarioPlanta: item, image: imageName })}
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

            {isLoadingUserPlants && (
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

            {!isLoadingUserPlants && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={userPlants}
                renderItem={renderItem}
              />
            )}
          </View>

          <View style={styles.menuContainer}>
            <Heading style={styles.title}>Pacotes</Heading>

            {isLoadingPlants && (
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

            {!isLoadingPlants && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={plant}
                renderItem={renderBundles}
              />
            )}
          </View>
        </View>

      </ScrollView>
    </>
  )
}
