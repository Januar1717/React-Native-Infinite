import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

const App = () => {
  const [daftarPlanet, setDaftarPlanet] = useState([]);
  const [nextPage, setNextPage] = useState(null); // Menyimpan URL halaman berikutnya
  const [selectedPlanet, setSelectedPlanet] = useState(null); // Menyimpan planet yang dipilih
  const [modalVisible, setModalVisible] = useState(false); // State untuk mengontrol keterlihatan modal

  useEffect(() => {
    fetchData("https://swapi.dev/api/planets/");
  }, []);

  const fetchData = (url) => {
    axios.get(url)
      .then((response) => {
        setDaftarPlanet((prevData) => [...prevData, ...response.data.results]);
        setNextPage(response.data.next); // Perbarui URL halaman berikutnya
      })
      .catch((err) => console.log(err));
  };

  const renderPlanetCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => selectPlanet(item)}>
      <View style={{
              marginHorizontal: 20, 
              marginTop: 10, 
              backgroundColor: '#ffffff', 
              elevation: 2,
              paddingVertical: 10,
              paddingLeft: 10,
              borderRadius: 3}}>
        <Text>Nama Planet : {item.name}</Text>
      </View>
      </TouchableOpacity>
    );
  };

  const selectPlanet = (planet) => {
    setSelectedPlanet(planet);
    setModalVisible(true); // Tampilkan modal saat planet dipilih
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const loadMoreData = () => {
    if (nextPage) {
      fetchData(nextPage);
    }
  };

  return (
    <View style={{flex:1}}>
      <Text>Planet List</Text>
      <FlatList 
        data={daftarPlanet}
        keyExtractor={(item) => item.name}
        renderItem={renderPlanetCard}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ marginTop: 50, padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {selectedPlanet ? selectedPlanet.name : ''}
          </Text>
          <Text>Rotation Period: {selectedPlanet ? selectedPlanet.rotation_period : ''}</Text>
          <Text>Orbital Period: {selectedPlanet ? selectedPlanet.orbital_period : ''}</Text>
          <Text>Diameter: {selectedPlanet ? selectedPlanet.diameter : ''}</Text>
          <Text>Climate: {selectedPlanet ? selectedPlanet.climate : ''}</Text>
          <Text>Gravity: {selectedPlanet ? selectedPlanet.gravity : ''}</Text>
          <Text>Terrain: {selectedPlanet ? selectedPlanet.terrain : ''}</Text>
          <Text>Surface Water: {selectedPlanet ? selectedPlanet.surface_water : ''}</Text>
          <Text>Population: {selectedPlanet ? selectedPlanet.population : ''}</Text>
          <TouchableOpacity onPress={closeModal} style={{ marginTop: 20 }}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default App;