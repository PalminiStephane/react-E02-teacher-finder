const app = {
    // On stocke une référence a la div principal '#app'
    containerEl: document.getElementById('app'),

    //On liste les languages 
    state: {
        //La liste de languages sera remplie à l'initialisation
        //elle contiendra une liste unique des languages
        languages: [''],

        //Liste unique des spécialités
        specialities: [''],

        selectedLanguage: '',

        selectedSpeciality: '',

        //Ici, on stockera la valeur calculée des profs qui correspondent à la recherche en cour
        filteredTeachers: [],

        //Liste des profs
        teachers: [
            {
                name: 'Loris',
                language: 'PHP',
                speciality: 'WordPress',
            },
            {
                name: 'Jean',
                language: 'JavaScript',
                speciality: 'Data',
            },
            {
                name: 'Jean-Christophe',
                language: 'PHP',
                speciality: 'Symfony',
            },
            {
                name: 'Jean-Philippe',
                language: 'PHP',
                speciality: 'Symfony',
            },
            {
                name: 'Julien',
                language: 'PHP',
                speciality: 'React',
            },
            {
                name: 'Vincent',
                language: 'JavaScript',
                speciality: 'React',
            },
            {
                name: 'Tony',
                language: 'JavaScript',
                speciality: 'React',
            },
            {
                name: 'Luko',
                language: 'JavaScript',
                speciality: 'React',
            },
        ],
    },

    // On sépare en petites fonctions la création de chaque partie de notre application
    init: function () {
        app.state.teachers.forEach(teacher => {
            //La liste des languages est vide par defaut 
            if (!app.state.languages.includes(teacher.language)) {
                app.state.languages.push(teacher.language);
            }

            //La liste des spécialitées est vide par defaut 
            if (!app.state.specialities.includes(teacher.speciality)) {
                app.state.specialities.push(teacher.speciality);
            }
        });

        //On aurait pu faire un one-liner un peu stylé...
        //app.state.languages = new Set(app.state.teachers.map(teacher => teacher.language))
        //app.state.specialities = new Set(app.state.teachers.map(teacher => teacher.speciality))

        //filteredTeachers sera la liste des profs correspondant à, la rechereche
        //par défaut pas de recherche, on considére donc que la liste des profs filtrés
        //est égale à la liste des profs
        app.state.filteredTeachers = app.state.teachers;

        app.render();
    },

    //On se simplifie la vie, on se crée une fonction qui nous aide à créer des éléments du DOM
    //Elle prend en paramètre le nom du tag, le parent dans lequel insérer l'élement crée
    //et un objet d'attributs (id, classe, ...)
    createElement(tag, parent, attributes) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        parent.appendChild(element);
        return element;
    },

    //Le formulaire de sélection du language
    createForm: function () {
        const formEl = app.createElement(
            'form',
            app.containerEl,
            {
                className: 'search'
            }
        );

        const languageSelectEl = app.createElement(
            'select',
            formEl,
            {
                className: 'search-choices'
            }
        );

        app.state.languages.forEach(language => {
            app.createElement(
                'option',
                languageSelectEl,
                {
                    value: language,
                    textContent: language,
                    selected: language === app.state.selectedLanguage
                }
            );
        });

        languageSelectEl.addEventListener('change', event => {
            app.state.selectedLanguage = event.target.value;
            app.setFilteredTeachers();
            app.render();
        });

        const specialitySelectEl = app.createElement(
            'select',
            formEl,
            {
                className: 'search-choices'
            }
        );

        app.state.specialities.forEach(function (speciality) {
            app.createElement(
                'option',
                specialitySelectEl,
                {
                    value: speciality,
                    textContent: speciality,
                    selected: speciality === app.state.selectedSpeciality
                }
            );
        });

        specialitySelectEl.addEventListener('change', event =>{
            app.state.selectedSpeciality = event.target.value;
            app.setFilteredTeachers();
            app.render();
        });
    },

    creatCounter: function () {
        app.createElement(
            'p',
            app.containerEl,
            {
                textContent: `${app.state.filteredTeachers.length} prof(s) trouvé(s)`,
                className: 'counter'
            }
        )
    },

    createList: function () {
        const teacherListEl = app.createElement(
            'ul',
            app.containerEl,
            {
                className: 'list'
            }
        );
        
        app.state.filteredTeachers.forEach(teacher => {
            const  teacherListItemEl = app.createElement(
                'li',
                teacherListEl,
                {
                    textContent: teacher.name,
                    className: 'list-item'
                }
            );

            app.createElement(
                'span',
                teacherListItemEl,
                {
                    textContent: teacher.name,
                    className: 'list-tag'
                }
            )
        });
    },





    setFilteredTeachers() {
        app.state.filteredTeachers = app.state.teachers.filter(teacher => {
            return (
                ((app.state.selectedSpeciality === '') || (teacher.speciality === app.state.selectedSpeciality)) &&
                ((app.state.selectedLanguage === '') || (teacher.language === app.state.selectedLanguage))

            )
        });
    },

    render() {
        app.containerEl.innerHTML = '';
        app.createForm();
        app.creatCounter();
        app.createList();
    }
};

document.addEventListener('DOMContentLoaded', app.init);