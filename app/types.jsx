// Define the users object
const users = {
    id: null,
    oauthusername: '',
    oauth: '',
    name: '',
    given_name: '',
    family_name: '',
    picture: '',
    email: '',
    totalInterations: 0,
    banned: false,
    isadmin: false
  };
  
  // Define the folders object
  const folders = {
    id: null,
    folder_name: '',
    folder_title: '',
    folder_path: ''
  };
  
  // Define the documents object
  const documents = {
    id: null,
    folder_id: null,
    document_name: '',
    document_title: '',
    document_path: ''
  };
  
  // Define the pages object
  const pages = {
    id: null,
    document_id: null,
    page_name: null,
    page_title: '',
    page_path: ''
  };
  
  // Define the comments object
  const comments = {
    id: null,
    page_id: null,
    user_id: null,
    notes: null,
    created: null,
    updated: null
  };
  
  // Define the tags object
  const tags = {
    id: null,
    label: '',
    disabled: false
  };
  
  // Define the taggings object
  const taggings = {
    id: null,
    tag_id: null,
    page_id: null,
    user_id: null
  };
  
  // Export the objects
  module.exports = {
    users,
    folders,
    documents,
    pages,
    comments,
    tags,
    taggings
  };