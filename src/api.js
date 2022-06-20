import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

// Checks validity of access token && sends
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

// Redirects user to to meet app after fetching new token from Google
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      'https://salr50ks73.execute-api.eu-central-1.amazonaws.com/dev/api/token' +
        '/' +
        encodeCode
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
};

export const getAccessToken = async () => {
  // Looks for access token in local storage
  const accessToken = localStorage.getItem('access_token');
  // Checks if access token was found & defines behaviour for "if not"
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get(
        'https://salr50ks73.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const { authURL } = results.data;
      return (window.location.href = authURL);
    }
    return code && getToken(code);
  }
  return accessToken;
};

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      'https://salr50ks73.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const result = await axios.get(url);
    if (result.data) {
      let locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

// Removes code from URL
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};
