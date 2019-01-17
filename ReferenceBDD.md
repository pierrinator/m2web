Liste des tables
=================

school
-----------------
| school_id | school_name | main_field  | sub_field | academy | region | department | city | type_diploma | diploma_name | *user_id* |
|-----------|-------------|-------------|-----------|---------|--------|------------|------|--------------|--------------|------------|
|int/NotNULL/autoincrement/primarykey|varchar(80)/NotNULL(etablissement_lib)|varchar(80)/NotNULL(gd_disciscipline_lib)|varchar(80)/NotNULL(discipline_lib)|varchar(80)/NotNULL(aca_etab_lib)|varchar(80)/NotNULL(reg_ins_lib)|varchar(80)/NotNULL(dep_ins_lib)|varchar(80)/NotNULL(uucr_ins_lib)|varchar(80)/NotNULL(diplome_rgp)|varchar(255)/NotNULL(libelle_intitule_1)|int/NotNULL/foreignkey references user(user_id)|

user
--------------
| user_id | user_name  | password |
|---------|-----------|----------|
|int/NotNULL/auto_increment/primarykey|varchar(80)/NotNULL|varchar(100)/NotNULL|
