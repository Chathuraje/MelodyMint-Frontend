import { Component } from '@angular/core';
import { Router } from '@angular/router';

// for making HTTP requests
import axios from 'axios';

import { getDefaultProvider } from 'ethers';
import {
  createClient,
  connect,
  disconnect,
  getAccount,
  signMessage,
  InjectedConnector,
} from '@wagmi/core';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {


  isNavbarCollapsed = false;
  constructor(private router: Router,
    ) {
   }


  ngOnInit(): void {

  }
  
  async onRegister() {
    const { isConnected } = getAccount();

    if (isConnected) await disconnect(); //disconnects the web3 provider if it's already active

    const provider = await connect({ connector: new InjectedConnector() }); // enabling the web3 provider metamask

    const userData = {
      address: provider.account,
      chainId: provider.chain.id,
      network: 'evm',
    };

    const { data } = await axios.post(
      `http://64.225.90.69:1998/api/auth/request_challenge`, userData
    );

    const message = data.message;

    const signature = await signMessage({ message });
    
    const challengeData = {
      message,
      signature,
      network: 'evm',
    }
    const response  = await axios.post(
      `http://64.225.90.69:1998/api/auth/verify_challenge`, challengeData
    )

    var response_data = response.data
      
    if (response_data.code === 404) {
      console.log('response', response.data);
      this.router.navigate(['/registration']);
    } else {
      this.router.navigate(['/']);
    }
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
