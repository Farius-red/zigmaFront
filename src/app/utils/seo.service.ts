import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(private titleService: Title, private metaService: Meta) { }

  addMetaTag(property: string, content: string) {
    this.metaService.addTags([{ property: property, content: content }]);
  }

  updateMetaTag(name: string, content: string) {
    this.metaService.updateTag({ name: name, content: content }, `name=${name}`);
  }

  addMetaTagTwitter(item: any) {
    this.metaService.addTags([
      {name: 'og:image', content: item.picture},
      {name: 'og:title', content: item.facebookkeywords},
      {name: 'og:description', content: item.facebookdescriptions},
      //{name: 'og:url', content: window.parent.location.href}
    ]);
    this.metaService.addTags([
      {property: 'og:image', content: item.picture},
      {property: 'og:title', content: item.facebookkeywords},
      {property: 'og:description', content: item.facebookdescriptions},
      //{name: 'og:url', content: window.parent.location.href}
    ]);
    //this.updateMetaTag("twitter:image",content);
    this.metaService.addTags(
      [
        { name: 'twitter:card', content: "summary" },
        { name: 'twitter:image', content: item.picture },
        { name: 'twitter:description', content: item.metadescriptions },
        { name: 'twitter:site', content: "www.google.com" },
        { name: 'twitter:title', content: item.title },
        { name: 'twitter:description', content: item.metadescriptions }
      ]);    
  }

}
