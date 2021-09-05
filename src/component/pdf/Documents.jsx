import React from 'react';
import { Page, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';
import { utile } from '../../services/utile';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff'
  },
  topMargin:{
    marginTop:50
  },
  medecinSection: {
    marginLeft: 75,
    marginBottom: 10,
    fontSize:12,
    fontWeight:500,
    // padding: 10,
    textAlign:'left',
    fontFamily: 'Times-Roman'
  },
  documentTitle:{
        fontSize:14,
        textAlign:'center',
        marginTop:25,
        marginBottom:25,
        fontWeight:900,
        fontFamily: 'Oswald'
  },
  documentText:{
    fontSize:12,
    marginLeft:75,
    marginRight:75,
    marginBottom:20,
    textAlign:'left',
    fontWeight:500,
    fontFamily: 'Times-Roman'
  },
  documentDateLieu:{
    fontSize:12,
    marginRight:75,
    marginTop:10,
    textAlign:'right',
    fontWeight:500,
    fontFamily: 'Times-Roman'
  }
});

function getTypeTrame(type, data){
    //console.log(data)
    if(type===1){
        return(
            <Document>
                <Page style={styles.page} wrap='false'>
                    <Text style={styles.topMargin}></Text>
                    <Text style={styles.medecinSection}>
                        Nom et Prénom du médecin: {data.nomPrenomsMedecin!==null?data.nomPrenomsMedecin:''}
                    </Text>
                    <Text style={styles.medecinSection}>
                        Adresse: {data.adresseMedecin!==null?data.adresseMedecin:''}
                    </Text>
                    <Text style={styles.medecinSection}>
                        Téléphone: {data.telephoneMedecin!==null?data.telephoneMedecin:''}
                    </Text>
                    <Text style={styles.medecinSection}>
                        Numéro inscription ONM: {data.numOnm!==null?data.numOnm:''}
                    </Text>
                    <Text style={styles.documentTitle}>CERTIFICAT  DE CONSTATATIONS DE VIOLENCES (Coups et blessures)</Text>
                    <Text style={styles.documentText}>Je soussigné{data.civilite!=='1'?'e':''}, Docteur {data.nomPrenomsMedecin!==null?data.nomPrenomsMedecin:''}, certifie avoir examiné {data.civilite==='0'?'Madame':data.civilite==='2'?'Mademoiselle':'Monsieur'} {data.nomSujet!==null?data.nomSujet:''} {data.prenomSujet!==null?data.prenomSujet:''} né{data.civilite!==null?data.civilite!=='1'?'e':'':''} le {data.dateNaissance!==null?utile.formatDate(data.dateNaissance):''} à {data.lieuNaissance!==null?data.lieuNaissance:''} et domicilié à {data.adresse!==null?data.adresse:''}, le {data.dateDocument!==null?utile.formatDate(data.dateDocument):''} à {data.heureDocument!==null?data.heureDocument:''}.</Text>
                    <Text style={styles.documentText}>La victime déclare avoir été {data.typeViolence!==null?data.typeViolence:''}, le {data.dateViolence!==null?utile.formatDate(data.dateViolence):''} à {data.heureViolence!==null?data.heureViolence:''} à {data.lieuViolence!==null?data.lieuViolence:''}.</Text>
                    <Text style={styles.documentText}>Après les examens que j’ai fait à la victime, je constate que {data.descriptionExamen!==null?data.descriptionExamen:''}.</Text>
                    <Text style={styles.documentText}>Son état de santé nécessite {data.conduiteSujet!==null?data.conduiteSujet:''}</Text>
                    <Text style={styles.documentText}>Ce certificat médical délivré est remis en main propre à l’intéressé pour valoir ce que de droit.</Text>
                    <Text style={styles.documentDateLieu}>Fait à {data.lieuDocument!==null?data.lieuDocument:''}, le {data.dateDocument!==null?utile.formatDateText(data.dateDocument):''}</Text>
                </Page>
            </Document>
        );
    } else if(type === 2){
        return(
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.topMargin}></Text>
                    <Text style={styles.documentTitle}>CERTIFICAT DE DÉCÈS</Text>
                    <Text style={styles.documentText}>Je soussigné{data.civilite!=='1'?'e':''}, Docteur {data.nomPrenomsMedecin!==null?data.nomPrenomsMedecin:''}, docteur en médecine inscrit à l'ONM {data.numOnm!==null?data.numOnm:''} certifie que la mort de la personne sous nommée est réelle et constante.</Text>
                    <Text style={styles.documentText}>Nom : {data.nomSujet!==null?data.nomSujet:''}</Text>
                    <Text style={styles.documentText}>Prénom : {data.prenomSujet!==null?data.prenomSujet:''}</Text>
                    <Text style={styles.documentText}>Date et lieu de naissance : {data.dateNaissance!==null?utile.formatDate(data.dateNaissance):''} à {data.lieuNaissance!==null?data.lieuNaissance:''}</Text>
                    <Text style={styles.documentText}>{data.civilite!=='1'?'Fille':'Fils'} de : {data.pere!==null?data.pere:''}</Text>
                    <Text style={styles.documentText}>Et de : {data.mere!==null?data.mere:''}</Text>
                    <Text style={styles.documentText}>Adresse : {data.adresse!==null?data.adresse:''}</Text>
                    <Text style={styles.documentText}>La cause du décès {data.causeDeces!==null?data.causeDeces:''}, le {data.dateDeces!==null?data.dateDeces:''} à {data.heureDeces!==null?data.heureDeces:''}  à {data.lieuDeces!==null?data.lieuDeces:''}</Text>
                    <Text style={styles.documentDateLieu}>Fait à {data.lieuDocument!==null?data.lieuDocument:''}, le {data.dateDocument!==null?utile.formatDateText(data.dateDocument):''}</Text>
                </Page>
            </Document>
        );
    } else if(type === 3){
        return(
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.topMargin}></Text>
                    <Text style={styles.documentTitle}>CERTIFICAT D’APTITUDE</Text>
                    <Text style={styles.documentText}>Je soussigné{data.civilite!=='1'?'e':''}, Docteur {data.nomPrenomsMedecin!==null?data.nomPrenomsMedecin:''}, certifie que {data.civilite==='0'?'Madame':data.civilite==='2'?'Mademoiselle':'Monsieur'} {data.nomSujet!==null?data.nomSujet:''} {data.prenomSujet!==null?data.prenomSujet:''} né{data.civilite!==null?data.civilite!=='1'?'e':'':''} le {data.dateNaissance!==null?utile.formatDate(data.dateNaissance):''} à {data.lieuNaissance!==null?data.lieuNaissance:''} et domicilié à {data.adresse!==null?data.adresse:''} ne présente aucune contre-indication physique ou psychologique pour {data.motif!==null?data.motif:''}.</Text>
                    <Text style={styles.documentText}>Ce certificat médical délivré est remis en main propre à l’intéressé pour valoir ce que de droit.</Text>
                    <Text style={styles.documentDateLieu}>Fait à {data.lieuDocument!==null?data.lieuDocument:''}, ce {data.dateDocument!==null?utile.formatDateText(data.dateDocument):''}</Text>
                </Page>
            </Document>
        );
    } else if(type === 4){
        return(
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.topMargin}></Text>
                    <Text style={styles.documentTitle}>CERTIFICAT D’INAPTITUDE</Text>
                    <Text style={styles.documentText}>Je soussigné{data.civilite!=='1'?'e':''}, Docteur {data.nomPrenomsMedecin!==null?data.nomPrenomsMedecin:''}, certifie que {data.civilite==='0'?'Madame':data.civilite==='2'?'Mademoiselle':'Monsieur'} {data.nomSujet!==null?data.nomSujet:''} {data.prenomSujet!==null?data.prenomSujet:''} né{data.civilite!==null?data.civilite!=='1'?'e':'':''} le {data.dateNaissance!==null?utile.formatDate(data.dateNaissance):''} à {data.lieuNaissance!==null?data.lieuNaissance:''} et domicilié à {data.adresse!==null?data.adresse:''} ne peut pas {data.motif!==null?data.motif:''}.</Text>
                    <Text style={styles.documentText}>Ce certificat médical délivré est remis en main propre à l’intéressé pour valoir ce que de droit.</Text>
                    <Text style={styles.documentDateLieu}>Fait à {data.lieuDocument!==null?data.lieuDocument:''}, ce {data.dateDocument!==null?utile.formatDateText(data.dateDocument):''}</Text>
                </Page>
            </Document>
        );
    }
}

// Create Document Component
const Documents = ({type, data}) => {
    // //console.log(data)
    return(
        getTypeTrame(type,data)
    );
}

export default Documents;