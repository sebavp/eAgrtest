import React from 'react';
import { connect, Provider } from 'react-redux';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { persistStore } from 'redux-persist';
import { loadMessage, sendMessage } from './actions';
import configureStore from './store';

const store = configureStore();


class App extends React.Component {

  componentDidMount = () => {
    const { loadMessage, sendMessage, messageToSend, sentSuccess } = this.props;
    this.loader = setInterval(loadMessage, 5000);
    if(!sentSuccess) {
      sendMessage(messageToSend);
    }
  }

  componentWillUnmount = () => {
     clearInterval(this.loader);
  }

  send = () => {
    this.props.sendMessage(this.state.text);
  }

  render = () => {
    const { message, sentSuccess, messageToSend } = this.props;
    return (
      <View style={styles.container}>
        <Text>{message}</Text>
        <TextInput
          onChangeText={t => this.setState({ text: t })}
          style={styles.input}
        />
        <Button onPress={this.send} title="Send" />
        {sentSuccess && !!messageToSend && (<Text>Sent</Text>)}
        {!sentSuccess && (<Text>Send failed, retrying...</Text>)}
      </View>
    );
  }
}

const mapDispatch = {
  loadMessage,
  sendMessage
}

const mapState = state => ({
  message: state.message,
  messageToSend: state.messageToSend,
  sentSuccess: state.sentSuccess

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#333',
    borderWidth: StyleSheet.hairlineWidth,
    width: 200,
    margin: 15
  }
});

const ConnectedApp = connect(mapState, mapDispatch)(App);

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rehydrated: false
    }
  }

  render = () => {
    return (
      <Provider store={store.store}>
        <ConnectedApp />
      </Provider>
    )
  }
}

export default Container;
