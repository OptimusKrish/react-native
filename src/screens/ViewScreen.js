import React from 'react';
import { Button, Text, Content, Spinner, Container } from 'native-base';

import { DBUtils } from '../constants/db';
import { ListExpense } from '../components/myThemes/listExpense';

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'My Expenses',
  };

  constructor(props){
    super(props);
    this.state = {
        listExp : [],
        Spinner: false,
    };
  }


  async getExpense() {
    this.setState({ Spinner: true });
    let exp = await DBUtils.select();
    exp = JSON.parse(exp);
    exp._array.map((e, i) => {
      const DBdate = new Date(e.Timestamp);
      e.Time = DBdate.toLocaleTimeString('en-US');
      // Hack To Append AM/PM
      const temp = e.Time.split(':') || [];
      e.Time = (temp[0] >= 12) ? `${e.Time} PM` : `${e.Time} AM`;
      e.sameDate = (e.Date !== new Date(e.Timestamp).toString().substr(4, 12).trim()) ?
                               new Date(e.Timestamp).toString().substr(4, 12).trim() : false;
    });
    this.setState({ listExp: exp._array || [], Spinner: false });
  }

  render() {
    console.log('Render >> ', this.state.listExp);
    if (this.state.Spinner) {
      return (
        <Container>
            <Spinner color='blue' />
        </Container>
      )
    }
    else if (this.state.listExp.length) {                
      return (
        <Content style={{borderColor: "Green"}}>
            <ListExpense listExp = {this.state.listExp}/>
            <Button style = {{margin: 10}} bordered onPress={this.getExpense.bind(this)}>
              <Text>Load more</Text>
            </Button>
        </Content>
      ) 
    } else {
      return (
        <Text> No expenses added yet!</Text>
      )
    }
  }

  componentDidMount() {
    // console.log('Onload >> ', new Date(1549638797933).toLocaleTimeString('en-US'));
    this.getExpense();
  }

}
