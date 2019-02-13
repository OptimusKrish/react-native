import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Picker, Form, DatePicker, Item, Text, Input, Button, Spinner, Toast, View } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DBUtils } from '../../constants/db';

export class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "snacks",
      chosenDate: new Date(),
      expense: '',
      spinner: true,
      inputError: false,
      dateError: false
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  async saveExpense() {
    this.setState({ spinner: true });
    const data = {
      d: this.state.chosenDate.toString().substr(4, 12).trim(),
      cat: this.state.selected,
      amt: this.state.expense.trim(),
      expTimestamp: new Date(this.state.chosenDate).getTime(),
      timestamp: +new Date,
    }
    if(!data.amt) { 
      this.setState({ inputError: true, spinner: false, expense: '', dateError: false });
      return;
    }
    if (data.expTimestamp >= data.timestamp) {
      this.setState({ spinner: false, expense: '', dateError: true, inputError: false });
      Toast.show({
        type: "danger",
        text: "Cannot save future Expenses :-(",
        buttonText: "Okay",
        buttonTextStyle: { color: "#000000" },
        buttonStyle: { backgroundColor: "#f8f8ff" },
        duration: 5000
      });
      return;
    }
    await DBUtils.insert(data);
    this.setState({ spinner: false, expense: '', inputError: false, dateError: false });
    Toast.show({
      text: "Expense added successfully",
      buttonText: "Okay",
      buttonStyle: { backgroundColor: "#5cb85c" }
    });
  }

  async getExpense() {
    this.setState({ spinner: true });
    const exp = await DBUtils.select();
    this.setState({ spinner: false });
  }

  async init() {
    try {
      await DBUtils.create();
      this.setState({ spinner: false });
    } catch (err){
        console.log(err);
    }
  }

  render() {
    if (this.state.spinner) {
      return (
        <Container>
        <Spinner color='blue' />
        </Container>
      );
    }
    return (
      <Container style={{ borderRadius: 10, margin: 30 }}>
        <Content>
          <Form style = {{ marginLeft: 20, marginBottom: 30 }}>
          <Item rounded style= {{borderColor: "#696969"}}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Snacks" value="snacks" />
              <Picker.Item label="Tea" value="tea" />
              <Picker.Item label="Cigrette" value="cigrette" />
              <Picker.Item label="Petrol" value="petrol" />
              <Picker.Item label="Food" value="food" />
            </Picker>
            </Item>
          </Form>
          <Item rounded style={[ this.state.dateError ? styles.dateError : styles.dateNormal ]}> 
            <Icon 
              name="calendar" 
              size={25} 
              style = {{marginLeft: 20, color: "#900"}}
              color="#900" 
            />
            <DatePicker
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2020, 12, 31)}
              locale={"en"}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText={<Text style={{color: "#900"}}> {this.state.chosenDate.toString().substr(4, 12)} </Text>}
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
          </Item>
            <Item rounded style = { [! this.state.inputError ? styles.normal : styles.error] }>
                <Input keyboardType = 'numeric' placeholder='Enter amount'
                 onChangeText={(expense) => this.setState({expense})} value={this.state.expense}
                 />
                 <View>
                 { 
                   !this.state.inputError && 
                   <Icon 
                   style = {{ fontSize: 15, marginRight: 20  }} 
                   name='rupee' 
                   />
                 }
                 { 
                   this.state.inputError && 
                   <Icon 
                   style = {{ fontSize: 18, marginRight: 20 }} 
                   name='warning' 
                   /> 
                 }
                 </View>
            </Item>
            <View style = {{ marginTop: 20, marginLeft: 90 }}>
                <Button style = {{margin: 10}} rounded success onPress={this.saveExpense.bind(this)}>
                    <Text>Save Expense</Text>
                </Button>
            </View>
        </Content>
      </Container>
    );
  }

  componentDidMount() {
    this.init();
  }
}

const styles = StyleSheet.create({
  error: {
    marginLeft: 20, 
    marginBottom: 30,
    borderColor: "#ff0000",
  },
  normal: {
    marginLeft: 20, 
    marginBottom: 30,
    borderColor: "#696969"
  },
  dateNormal: {
    marginLeft: 20, 
    marginBottom: 30, 
    borderColor: '#f5fffa'
  },
  dateError: {
    marginLeft: 20, 
    marginBottom: 30, 
    borderColor: "#ff0000",
  }
});