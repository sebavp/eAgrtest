import React from 'react';
import { connect, Provider } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { persistStore } from 'redux-persist';
import { loadMessage } from './actions';
import configureStore from './store';

const store = configureStore();


class App extends React.Component {

  componentDidMount = () => {
    this.props.loadMessage()
    // this.loader = setInterval(this.props.loadMessage, 5000);
  }

  // componentWillUnmount = () => {
  //   clearInterval(this.loader);
  // }

  render = () => {
    const { message } = this.props;
    return (
      <View style={styles.container}>
        <Text>{message}</Text>
      </View>
    );
  }
}

const mapDispatch = {
  loadMessage
}

const mapState = state => ({
  message: state.message
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
