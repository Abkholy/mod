import { environment as env } from '../../environments/environment';
/* This file should contain All EndPoint Routes Across all the application*/
/* Follow the Naming Convention*/

const BaseUrl = '';
const server = env.serverUrl;
const projectName = env.project;
const contextURI = env.contextURI;
// const BaseUrl = environment.api + environment.apiLang + environment.apiVersion;
export const API_URLS = {
    'collage': {
        'add': server + projectName + contextURI + '/collage',
        'deleteOne': server + projectName + contextURI + '/collage/{collageId}',
        'editOne': server + projectName + contextURI + '/collage/{collageId}',
        'getAll': server + projectName + contextURI + '/collage',
        'getOne': server + projectName + contextURI + '/collage/{collageId}'
    },
    'locationType': {
        'add': server + projectName + contextURI + '/locationType',
    
        'deleteOne': server + projectName + contextURI + '/locationType/{locationTypeId}',
        'editOne': server + projectName + contextURI + '/locationType/{locationTypeId}',
        'getAll': server + projectName + contextURI + '/locationType',
        'getOne': server + projectName + contextURI + '/locationType/{locationTypeId}'
    },
    'location': {
        'add': server + projectName + contextURI + '/location',
        'deleteOne': server + projectName + contextURI + '/location/{locationId}',
        'editOne': server + projectName + contextURI + '/location/{locationId}',
        'getAll': server + projectName + contextURI + '/location',
        'getOne': server + projectName + contextURI + '/location/{locationId}'
    },
    'auth':{
        'add': server + projectName + contextURI +'/auth'
    },
    'users': {
        'add': server + projectName + contextURI + '/users',
        'deleteOne': server + projectName + contextURI + '/users/{usersId}',
        'editOne': server + projectName + contextURI + '/users/{usersId}',
        'getAll': server + projectName + contextURI + '/users',
        'getOne': server + projectName + contextURI + '/users/{usersId}'
    },
    'semester': {
        'add': server + projectName + contextURI + '/semester',
        'deleteOne': server + projectName + contextURI + '/semester/{semesterId}',
        'editOne': server + projectName + contextURI + '/semester/{semesterId}',
        'getAll': server + projectName + contextURI + '/semester',
        'getOne': server + projectName + contextURI + '/semester/{semesterId}'
    },
    'subject': {
        'add': server + projectName + contextURI + '/subject',
        'deleteOne': server + projectName + contextURI + '/subject/{subjectId}',
        'editOne': server + projectName + contextURI + '/subject/{subjectId}',
        'getAll': server + projectName + contextURI + '/subject',
        'getOne': server + projectName + contextURI + '/subject/{subjectId}'
    },  
      'student': {
          'add': server + projectName + contextURI + '/student',
          'deleteOne': server + projectName + contextURI + '/student/{studentId}',
          'editOne': server + projectName + contextURI + '/student/{studentId}',
          'getAll': server + projectName + contextURI + '/student',
          'getOne': server + projectName + contextURI + '/student/{studentId}'
    },  
      'registration': {
          'add': server + projectName + contextURI + '/registration',
          'deleteOne': server + projectName + contextURI + '/registration/{registrationId}',
          'editOne': server + projectName + contextURI + '/registration/{registrationId}',
          'getAll': server + projectName + contextURI + '/registration',
          'getOne': server + projectName + contextURI + '/registration/{registrationId}'
    },   
       'registrationLines': {
           'add': server + projectName + contextURI + '/registrationLines',
           'deleteOne': server + projectName + contextURI + '/registrationLines/{registrationLinesId}',
           'editOne': server + projectName + contextURI + '/registrationLines/{registrationLinesId}',
           'getAll': server + projectName + contextURI + '/registrationLines',
           'getOne': server + projectName + contextURI + '/registrationLines/{registrationLinesId}'
    },   
        'timetable': {
            'add': server + projectName + contextURI + '/timeTable',
            'deleteOne': server + projectName + contextURI + '/timeTable/{timetableId}',
            'editOne': server + projectName + contextURI + '/timeTable/{timetableId}',
            'getAll': server + projectName + contextURI + '/timeTable',
            'getOne': server + projectName + contextURI + '/timeTable/{timetableId}'
    },     
       'attTable': {
           'add': server + projectName + contextURI + '/attTable',
           'deleteOne': server + projectName + contextURI + '/attTable/{attTableId}',
           'editOne': server + projectName + contextURI + '/attTable/{attTableId}',
           'getAll': server + projectName + contextURI + '/attTable',
           'getOne': server + projectName + contextURI + '/attTable/{attTableId}'
    },      
     'attTableLines': {
         'add': server + projectName + contextURI + '/attTableLines',
         'deleteOne': server + projectName + contextURI + '/attTableLines/{attTableLinesId}',
         'editOne': server + projectName + contextURI + '/attTableLines/{attTableLinesId}',
         'getAll': server + projectName + contextURI + '/attTableLines',
         'getOne': server + projectName + contextURI + '/attTableLines/{attTableLinesId}'
    },
};
