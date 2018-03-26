
     
import En from './locales/en.json'
import Ar from './locales/ar.json'
const path = require("path")

class i18n_{

   constructor(){
    this.Language="en"
    this.locales=["en","ar"]

    this.getLocale=this.getLocale.bind(this)
    this.setLocale=this.setLocale.bind(this)
    this.t=this.t.bind(this)
    this.loadLanguage=this.loadLanguage.bind(this)
   }

  getLocale(){
    return this.Language
  }

  setLocale(Language){
   this.Language=Language
   this.loadLanguage()
  }
  loadLanguage(){
  	// return JSON.parse(path.join(__dirname, this.getLocale()+'.json'), 'utf8')
  	return this.Language=="en" ? En : Ar
  }


  t(objStr){
  	let loadLanguage=this.loadLanguage()

  	return( eval('loadLanguage.'+objStr) )
  }





}


export default i18n_