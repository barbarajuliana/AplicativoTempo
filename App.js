//adcionado novas alterações

import React from 'react';
import {AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput
} from 'react-native';

export default class App extends React.Component {
   constructor(props){
     super(props);
     this.state = { 
       cidade: ''
     }
   }
   buscar(textocidade){
     return fetch ('https://api.hgbrasil.com/weather?key=1c8aaae4&format=json-cors&locale=pt&city_name='+textocidade)
     .then((response) => response.json())
     .then((responseJson)=>{
        this.setState({
          cidade: textocidade,
          titulo: responseJson.title,
          descricao: responseJson.results.description,
          temp: responseJson.results.temp,
          vento: responseJson.results.wind_speedy,
          porsol: responseJson.results.sunset,
          nascersol: responseJson.results.sunrise,
          humidade: responseJson.results.humidity,
          imagem: 'https://assets.hgbrasil.com/weather/images/' + responseJson.results.img_id + '.png',
          
        }, function(){

        });
     }) 
     .catch((erro)=> {
       console.error(erro);
     });
    }

render(){
  return (
    <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/c1/3c/79/c13c7961fdecab3098dc7688262798cd.jpg'}} 
          style={{width: '100%', height: '100%'}}>
          <View style={{width: 370, height: 230, backgroundColor: 'powderblue'}}>
            
            <Text style={styles.welcome}> {this.state.cidade} </Text>
            <View style={{flex:1, flexDirection : 'row', justifyContent: 'center'}}> 
            <TextInput style={styles.inputTexto} placeholder="Informe a Cidade"
              onSubmitEditing={({nativeEvent}) => this.buscar(nativeEvent.text)}/>
            <Image
                style={{width: 100 , height: 100 }}
                source={{uri: this.state.imagem}}/> 
            </View>  
              <Text style={styles.welcome}> {this.state.temp} </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.fonteatt}>
              Descrição: {this.state.descricao}
            </Text>
            <View style={{flex: 2}}>
            <View style={{flex:2, flexDirection : 'row', justifyContent: 'space-between'}}>
              <Text style={styles.fontesensacao}>Vento {this.state.vento} </Text>
              <Text style={styles.fontesensacao}>Umidade  {this.state.humidade} % </Text>
            </View>
            <View style={{flex:2, flexDirection : 'row', justifyContent: 'space-between'}}>
              <Text style={styles.fontesensacao}>Nascer do Sol {this.state.nascersol} </Text>
              <Text style={styles.fontesensacao}>Pôr do Sol       {this.state.porsol} </Text>
            </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 35,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  },
  fonteatt: {
    fontSize: 25,
    textAlign: 'center',
    margin: 20,
  },
  fontesensacao: {
    fontSize: 20,
    textAlign: 'center',
    margin: 1,
    flex: 2
  },
  inputTexto: {
    height: 40, 
    borderColor: 'gray', 
    
  }
})