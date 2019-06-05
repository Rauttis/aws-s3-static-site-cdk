import * as cdk from '@aws-cdk/cdk'
import { StaticSite } from './static-site'

/**
 * This stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "subdomain": "www"
 *   }
 * }
 * Subdomain is optional.
**/
class StaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props)

    if (!this.node.getContext('domain')) throw new Error('Domain context must be set (-c domain=mydomain.com)')

    new StaticSite(this, 'StaticSite', {
      domainName: this.node.getContext('domain'),
      siteSubDomain: this.node.getContext('subdomain'),
    })
  }
}

const app = new cdk.App()

new StaticSiteStack(app, 'StaticSite', { env: { region: 'eu-west-1' } })

app.run()
