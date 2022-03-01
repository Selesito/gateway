import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'shop-one',
        data: { pageTitle: 'gatewayApp.producerShopOne.home.title' },
        loadChildren: () => import('./producer/shop-one/shop-one.module').then(m => m.ProducerShopOneModule),
      },
      {
        path: 'shop-two',
        data: { pageTitle: 'gatewayApp.consumerShopTwo.home.title' },
        loadChildren: () => import('./consumer/shop-two/shop-two.module').then(m => m.ConsumerShopTwoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
