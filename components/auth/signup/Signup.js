import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import SignupForm from './SignupForm';
import theme from '../../../style';
import { TextInput } from '../../input';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  header: { marginTop: 50 },
  inputWrapper: { marginTop: theme.utils.margin.base * 2 },
  input: { marginTop: theme.utils.margin.base * 4 },
  button: { marginTop: theme.utils.margin.base * 4 },
  footer: {
    marginTop: 18,
  },
  footerInner: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: { marginLeft: 10, textDecorationLine: 'underline' },
});

const Signup = ({ navigation }) => {
  return (
    <View style={{ ...theme.utils.screen.content, ...styles.wrapper }}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('Indietro')}>
            <Icon
              color={theme.colors.secondary}
              size={theme.utils.sizes.backIcon}
              name="angle-left"
            />
          </TouchableOpacity>
          <Text style={theme.fonts.title}>Iscriviti</Text>
          <Text style={theme.fonts.headLine}>Benvenuto su Ermess!</Text>
        </View>

        <SignupForm />

        <View style={styles.footer}>
          <View style={styles.footerInner}>
            <Text style={theme.fonts.grayText}>Sei già iscritto?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ ...theme.fonts.link, ...styles.link }}>Accedi!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Signup);
