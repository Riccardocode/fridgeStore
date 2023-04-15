import { Card, Button, Icon } from "react-native-elements";
import { ScrollView, Text} from "react-native"
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

const ContactScreen = () =>{
    const sendMail = () =>{
        MailComposer.composeAsync({
            recipients:['campsites@nucamp.co'],
            subject:'Inquiry',
            body:'To whom it may concern:'
        });
    };
    return( 
    <ScrollView>
        <Animatable.View animation="rubberBand" duration={2000} >
        <Card wrapperStyle={{margin:20}}>
            <Card.Title>Contact Information</Card.Title>
            <Card.Divider />
            <Text style={{textAlign:'center', fontSize:25}}>Don't be shy! </Text>
            <Text>Contact us for any information / support you require</Text>
            
            <Text style={{marginTop:10}}>Phone: 39-455-555-1234</Text>
            <Text>Email: support@fridgestore.com</Text>
            <Button 
                title = 'Send Email'
                buttonStyle={{backgroundColor:'#2b9094',margin:40}}
                icon={
                    <Icon 
                        name='envelope-o'
                        type='font-awesome'
                        color='#fff'
                        iconStyle={{marginRight:10}}
                    />
                }
                onPress={()=>sendMail()}

            />
        </Card>
        </Animatable.View>
    </ScrollView>
    );
}

export default ContactScreen;