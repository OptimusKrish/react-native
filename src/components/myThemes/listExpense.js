import React, { Component } from "react";
import { Body, Text, Card, CardItem  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ListExpense extends Component {
    
    render() {
        return(
                this.props.listExp.map(
                  (exp, i) => 
                  (
                    <Card style={{borderColor: "Red"}} key= {i}>
                    <CardItem header>
                      <Text>For {exp.Category}</Text>
                      { exp.sameDate && 
                        <Text style={{ position: 'absolute', right: 5 }}> <Icon name="calendar-times-o" size={17} color="#900" /> {exp.sameDate} {exp.Time}</Text>
                      }
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>
                          Spent Rs.{exp.Amount}/-
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer>
                    { exp.sameDate && 
                        <Text>On {exp.Date}</Text>
                    }
                    { !exp.sameDate && 
                        <Text>On {exp.Date} <Icon name="clock-o" size={14} color="#900" /> {exp.Time}</Text>
                    }
                    </CardItem>
                  </Card>
                  )
                )
        )
    }
}

