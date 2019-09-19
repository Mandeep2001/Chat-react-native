import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, SectionList, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import KeyboardSpacer from 'react-native-keyboard-spacer';
// import moment from 'moment';
import Message from './Message';
import Input from './Input';
import { MainStyles, Colors } from '../../style/styles';
import { SocketContext } from '../../context/SocketContext';
import { sendMessageAction } from '../../store/actions/chatActions';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.lowConstrastGray,
  },
  messageList: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: MainStyles.padding.mainPadding,
  },
});

const Chat = ({ navigation }) => {
  const { socket } = useContext(SocketContext);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const activeUser = useSelector(state =>
    state.chat.users.find(u => u.user._id === navigation.state.params.user._id)
  );

  const [messages, setMessages] = useState([]);

  // const formatData = data => {
  //   const messagesByDate = data.reduce((acc, m) => {
  //     const foundIndex = acc.findIndex(
  //       element => element.key === moment(m.createdAt).format('DD MMM YY')
  //     );
  //     if (foundIndex === -1) {
  //       return [
  //         ...acc,
  //         {
  //           key: moment(m.createdAt).format('DD MMM YY'),
  //           data: [{ ...m }],
  //         },
  //       ];
  //     }
  //     acc[foundIndex].data = [...acc[foundIndex].data, { ...m }];
  //     return acc;
  //   }, []);

  //   return messagesByDate;
  // };

  useEffect(() => {
    setMessages(activeUser.messages);
    if (user && activeUser) {
      socket.emit('visualize', { sender: user, receiver: activeUser.user });
    }
  }, [activeUser]);

  const sendMessage = message => {
    const data = {
      _id: uuid(),
      message,
      senderUserID: user._id,
      receiverUserID: navigation.state.params.user._id,
      isVisualized: false,
      createdAt: Date(),
    };

    socket.emit('send_message', data);
    dispatch(sendMessageAction(data));
  };

  return (
    <View style={[MainStyles.containerWithoutPadding, styles.wrapper]}>
      <FlatList
        // sections={formatData(messages)}
        // renderSectionHeader={({ section: { key } }) => <Text style={styles.header}>{key}</Text>}
        data={messages}
        style={styles.messageList}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={item => item._id}
        inverted
      />
      <Input sendMessage={sendMessage} />
      <KeyboardSpacer />
    </View>
  );
};

Chat.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        messages: PropTypes.instanceOf(Array).isRequired,
        user: PropTypes.shape({
          _id: PropTypes.string.isRequired,
        }),
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withNavigation(Chat);
