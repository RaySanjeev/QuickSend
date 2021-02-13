/* eslint-disabled */
import '@babel/polyfill';
import { sendText } from './sendText';

// DOM ELEMENTS
const sendMessageBtn = document.querySelector('.send__text');
const contactListBtn = document.querySelector('.sidebar__btn--1');
const messagesSentBtn = document.querySelector('.sidebar__btn--2');
const contactList = document.querySelector('.overview__content--contacts');
const messagesList = document.querySelector('.overview__content--messages');

// DELEGATIONS
if (sendMessageBtn) {
  sendMessageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userID = sendMessageBtn.dataset.userId;
    const otp = sendMessageBtn.dataset.otp;
    console.log(userID, otp);
    sendMessageBtn.textContent = 'Processing...';
    sendText(userID, otp);
  });
}

const btnFunctions = function () {
  contactList.classList.add('hidden');
  messagesList.classList.add('hidden');
  contactListBtn.classList.remove('active');
  messagesSentBtn.classList.remove('active');
};

if (contactListBtn) {
  contactListBtn.addEventListener('click', (e) => {
    e.preventDefault();

    btnFunctions();
    contactList.classList.remove('hidden');
    contactListBtn.classList.add('active');
  });
}

if (messagesSentBtn) {
  messagesSentBtn.addEventListener('click', (e) => {
    e.preventDefault();

    btnFunctions();
    messagesList.classList.remove('hidden');
    messagesSentBtn.classList.add('active');
  });
}
