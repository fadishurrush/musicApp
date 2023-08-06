import {StyleSheet} from 'react-native';

styles = StyleSheet.create({
  example: {
    backgroundColor : 'white', // وضع لون للخلفية
    borderColor : 'green', // وضع لون للغلاف
    borderRadius : 25, // انحناء الغلاف
    borderWidth : 10, // عرض الغلاف
    margin: 10, // الابتعاد من الخارج
    padding: 5, // الابتعاد الى الداخل
    alignItems:'flex-start', // الاصطفاف بشكل عامودي
    alignSelf:'auto', // الاصطفاف 
    justifyContent:'center', // الاصطفاف بشكل افقي
    height: 30, // ارتفاع 
    width:50, // عرض
    flex:1, // اتخاد كل المساحة المتواجدة
    flexDirection:'column-reverse', //  كيفية الاصطفاف بشكل عامودي/افقي
    opacity:0.5 // كمية الظهور 
    
  },
});
