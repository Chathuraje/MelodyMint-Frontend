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
import { StorageService } from 'src/app/@application/service/storage.service';
import { Paths } from 'src/app/@application/enums/paths';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  disbutton = false
  isNavbarCollapsed = false;
  constructor(
    private router: Router,
    private storageService: StorageService,
    ) {

      var userId = this.storageService.getFromLocalStorage('userId');
      console.log(userId);
      if(userId) {
        this.disbutton = true
      } else {
        this.disbutton = false
      }

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
      `http://127.0.0.1:1998/api/auth/request_challenge`, userData
    );

    const message = data.message;

    const signature = await signMessage({ message });

    const challengeData = {
      message,
      signature,
      network: 'evm',
    }
    const response  = await axios.post(
      `http://127.0.0.1:1998/api/auth/verify_challenge`, challengeData
    )

    var response_data = response.data
    console.log(response_data)
    if (response_data.code === 404) {
      this.storageService.saveToLocalStorage('wallet_address', userData.address);
      console.log('response', response.data);
      this.router.navigate([Paths.Registration]);
    } else {
      this.storageService.saveToLocalStorage('userId', response.data.data.username);
      this.router.navigate(['/']);
    }
  }

  onFundRaise(){
    this.router.navigate([Paths.FundRaise]);
  }
  onCreateFundRaise(){
    this.router.navigate([Paths.CreateFundRaise]);
  }
  onMusicTracer(){
    this.router.navigate([Paths.ViewMusicTracer]);

  }
  onMarketplace(){
    this.router.navigate([Paths.MarketPlace]);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
