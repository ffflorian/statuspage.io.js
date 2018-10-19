import {IncidentsAPI, ScheduledMaintenancesAPI, SubscribersAPI} from './api/';

export namespace HTTP {
  export type Method = 'delete' | 'get' | 'post' | 'put';

  export enum Status {
    NO_CONTENT = 204,
    FOUND = 302,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOO_MANY_REQUESTS = 429,
  }
}

export namespace Result {
  export interface Component {
    components?: string[];
    created_at: string;
    description: string | null;
    group_id: string | null;
    id: string;
    name: string;
    page_id: string;
    position: number;
    showcase: boolean;
    status: string;
    updated_at: string;
  }

  export interface Page {
    page: {
      id: string;
      name: string;
      url: string;
      updated_at: string;
    };
  }

  export interface Incidents extends Page {
    incidents: Incident[];
  }

  export interface Components extends Page {
    components: Component[];
  }

  export interface ScheduledMaintenance extends Incident {
    scheduled_for: string;
    scheduled_until: string;
  }

  export interface ScheduledMaintenances extends Page {
    scheduled_maintenances: ScheduledMaintenance[];
  }

  export interface Subscriber extends Page {
    can_select_components: boolean;
    mode: 'webhook' | 'email_sms';
    webhook: string;
  }

  export interface Incident {
    created_at: string;
    id: string;
    impact: string;
    incident_updates: IncidentUpdate[];
    monitoring_at: string | null;
    name: string;
    page_id: string;
    resolved_at: string | null;
    shortlink: string;
    status: string;
    updated_at: string;
  }

  export interface IncidentUpdate {
    body: string;
    created_at: string;
    display_at: string;
    id: string;
    incident_id: string;
    status: string;
    updated_at: string;
  }

  export interface Status extends Page {
    status: {
      indicator: string;
      description: string;
    };
  }

  export type Summary = Status & ScheduledMaintenance & Components & Incidents;
}

export namespace Request {
  export interface ClientOptions {
    apiUrl: string;
  }

  export interface EmailSubscriberData {
    email: string;
  }

  export interface IncidentSubscriberData {
    incident_id: string;
  }

  export interface Options {
    subscriber?: CombinedSubscriberData | (CombinedSubscriberData & IncidentSubscriberData) | {id: string};
  }

  export interface SMSSubscriberData {
    phone_number: string;
    /** defaults to `us` if not supplied */
    phone_country?: string;
  }

  export interface SubscriberOptions {
    isSubscribed: boolean;
  }

  export interface WebhookSubscriberData extends EmailSubscriberData {
    endpoint: string;
  }

  export type CombinedSubscriberData = SMSSubscriberData | EmailSubscriberData | WebhookSubscriberData;
}

export interface API {
  getComponents: () => Promise<Result.Component[]>;
  getStatus: () => Promise<Result.Status>;
  getSummary: () => Promise<Result.Summary>;
  incidents: IncidentsAPI;
  scheduledMaintenances: ScheduledMaintenancesAPI;
  subscribers: SubscribersAPI;
}
