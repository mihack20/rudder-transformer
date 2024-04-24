export const networkCallsData = [
  {
    httpReq: {
      url: 'https://api.hubapi.com/properties/v1/contacts/properties?hapikey=dummy-apikey',
      method: 'GET',
    },
    httpRes: {
      status: 200,
      data: [
        { name: 'company_size', type: 'string' },
        { name: 'date_of_birth', type: 'string' },
        { name: 'days_to_close', type: 'number' },
        {
          name: 'date_submitted',
          type: 'date',
        },
        {
          name: 'days_create',
          type: 'date',
        },
        {
          name: 'days_closed',
          type: 'date',
        },
        { name: 'degree', type: 'string' },
        { name: 'field_of_study', type: 'string' },
        { name: 'first_conversion_date', type: 'datetime' },
        { name: 'first_conversion_event_name', type: 'string' },
        { name: 'first_deal_created_date', type: 'datetime' },
        { name: 'gender', type: 'string' },
        { name: 'graduation_date', type: 'string' },
        { name: 'hs_additional_emails', type: 'enumeration' },
        { name: 'hs_all_contact_vids', type: 'enumeration' },
        {
          name: 'hs_analytics_first_touch_converting_campaign',
          type: 'string',
        },
        { name: 'hs_analytics_last_touch_converting_campaign', type: 'string' },
        { name: 'hs_avatar_filemanager_key', type: 'string' },
        { name: 'hs_calculated_form_submissions', type: 'enumeration' },
        { name: 'hs_calculated_merged_vids', type: 'enumeration' },
        { name: 'hs_calculated_mobile_number', type: 'string' },
        { name: 'hs_calculated_phone_number', type: 'string' },
        { name: 'hs_calculated_phone_number_area_code', type: 'string' },
        { name: 'hs_calculated_phone_number_country_code', type: 'string' },
        { name: 'hs_calculated_phone_number_region_code', type: 'string' },
        { name: 'hs_content_membership_email_confirmed', type: 'bool' },
        { name: 'hs_content_membership_notes', type: 'string' },
        { name: 'hs_content_membership_registered_at', type: 'datetime' },
        {
          name: 'hs_content_membership_registration_domain_sent_to',
          type: 'string',
        },
        {
          name: 'hs_content_membership_registration_email_sent_at',
          type: 'datetime',
        },
        { name: 'hs_content_membership_status', type: 'enumeration' },
        { name: 'hs_conversations_visitor_email', type: 'string' },
        { name: 'hs_created_by_conversations', type: 'bool' },
        { name: 'hs_created_by_user_id', type: 'string' },
        { name: 'hs_createdate', type: 'datetime' },
        { name: 'hs_document_last_revisited', type: 'datetime' },
        { name: 'hs_email_domain', type: 'string' },
        { name: 'hs_email_quarantined', type: 'bool' },
        { name: 'hs_email_quarantined_reason', type: 'enumeration' },
        { name: 'hs_email_recipient_fatigue_recovery_time', type: 'datetime' },
        { name: 'hs_email_sends_since_last_engagement', type: 'number' },
        { name: 'hs_emailconfirmationstatus', type: 'enumeration' },
        { name: 'hs_facebook_ad_clicked', type: 'bool' },
        { name: 'hs_feedback_last_nps_follow_up', type: 'string' },
        { name: 'hs_feedback_last_nps_rating', type: 'enumeration' },
        { name: 'hs_feedback_last_survey_date', type: 'datetime' },
        { name: 'hs_feedback_show_nps_web_survey', type: 'bool' },
        { name: 'hs_google_click_id', type: 'string' },
        { name: 'hs_ip_timezone', type: 'string' },
        { name: 'hs_is_contact', type: 'bool' },
        { name: 'hs_last_sales_activity_date', type: 'datetime' },
        { name: 'hs_lastmodifieddate', type: 'datetime' },
        { name: 'hs_lead_status', type: 'enumeration' },
        { name: 'hs_legal_basis', type: 'enumeration' },
        { name: 'hs_merged_object_ids', type: 'enumeration' },
        { name: 'hs_object_id', type: 'number' },
        { name: 'hs_predictivecontactscore_v2', type: 'number' },
        { name: 'hs_predictivescoringtier', type: 'enumeration' },
        { name: 'hs_sales_email_last_clicked', type: 'datetime' },
        { name: 'hs_sales_email_last_opened', type: 'datetime' },
        {
          name: 'hs_searchable_calculated_international_mobile_number',
          type: 'phone_number',
        },
        {
          name: 'hs_searchable_calculated_international_phone_number',
          type: 'phone_number',
        },
        {
          name: 'hs_searchable_calculated_mobile_number',
          type: 'phone_number',
        },
        { name: 'hs_searchable_calculated_phone_number', type: 'phone_number' },
        { name: 'hs_sequences_is_enrolled', type: 'bool' },
        { name: 'hs_updated_by_user_id', type: 'string' },
        { name: 'hubspot_owner_assigneddate', type: 'datetime' },
        { name: 'ip_city', type: 'string' },
        { name: 'ip_country', type: 'string' },
        { name: 'ip_country_code', type: 'string' },
        { name: 'ip_latlon', type: 'string' },
        { name: 'ip_state', type: 'string' },
        { name: 'ip_state_code', type: 'string' },
        { name: 'ip_zipcode', type: 'string' },
        { name: 'job_function', type: 'string' },
        { name: 'lastmodifieddate', type: 'datetime' },
        { name: 'marital_status', type: 'string' },
        { name: 'military_status', type: 'string' },
        { name: 'num_associated_deals', type: 'number' },
        { name: 'num_conversion_events', type: 'number' },
        { name: 'num_unique_conversion_events', type: 'number' },
        { name: 'recent_conversion_date', type: 'datetime' },
        { name: 'recent_conversion_event_name', type: 'string' },
        { name: 'recent_deal_amount', type: 'number' },
        { name: 'recent_deal_close_date', type: 'datetime' },
        { name: 'relationship_status', type: 'string' },
        { name: 'school', type: 'string' },
        { name: 'seniority', type: 'string' },
        { name: 'start_date', type: 'string' },
        { name: 'test_date', type: 'date' },
        { name: 'test_key', type: 'string' },
        { name: 'test_prop', type: 'string' },
        { name: 'test_property', type: 'string' },
        { name: 'total_revenue', type: 'number' },
        { name: 'work_email', type: 'string' },
        { name: 'firstname', type: 'string' },
        { name: 'hs_analytics_first_url', type: 'string' },
        { name: 'hs_email_delivered', type: 'number' },
        { name: 'hs_email_optout_7283808', type: 'enumeration' },
        { name: 'twitterhandle', type: 'string' },
        { name: 'currentlyinworkflow', type: 'enumeration' },
        { name: 'hs_analytics_last_url', type: 'string' },
        { name: 'hs_email_open', type: 'number' },
        { name: 'fax', type: 'string' },
        { name: 'hs_analytics_first_timestamp', type: 'datetime' },
        { name: 'hs_email_last_email_name', type: 'string' },
        { name: 'hs_email_last_send_date', type: 'datetime' },
        { name: 'address', type: 'string' },
        { name: 'engagements_last_meeting_booked', type: 'datetime' },
        { name: 'engagements_last_meeting_booked_campaign', type: 'string' },
        { name: 'engagements_last_meeting_booked_medium', type: 'string' },
        { name: 'engagements_last_meeting_booked_source', type: 'string' },
        { name: 'hs_analytics_first_visit_timestamp', type: 'datetime' },
        { name: 'hs_email_last_open_date', type: 'datetime' },
        { name: 'hs_sales_email_last_replied', type: 'datetime' },
        { name: 'hubspot_owner_id', type: 'enumeration' },
        { name: 'notes_last_contacted', type: 'datetime' },
        { name: 'notes_last_updated', type: 'datetime' },
        { name: 'notes_next_activity_date', type: 'datetime' },
        { name: 'num_contacted_notes', type: 'number' },
        { name: 'num_notes', type: 'number' },
        { name: 'surveymonkeyeventlastupdated', type: 'number' },
        { name: 'webinareventlastupdated', type: 'number' },
        { name: 'city', type: 'string' },
        { name: 'hs_analytics_last_timestamp', type: 'datetime' },
        { name: 'hs_email_last_click_date', type: 'datetime' },
        { name: 'hubspot_team_id', type: 'enumeration' },
        { name: 'hs_all_owner_ids', type: 'enumeration' },
        { name: 'hs_analytics_last_visit_timestamp', type: 'datetime' },
        { name: 'hs_email_first_send_date', type: 'datetime' },
        { name: 'state', type: 'string' },
        { name: 'hs_all_team_ids', type: 'enumeration' },
        { name: 'hs_analytics_source', type: 'enumeration' },
        { name: 'hs_email_first_open_date', type: 'datetime' },
        { name: 'zip', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'hs_all_accessible_team_ids', type: 'enumeration' },
        { name: 'hs_analytics_source_data_1', type: 'string' },
        { name: 'hs_email_first_click_date', type: 'datetime' },
        { name: 'hs_analytics_source_data_2', type: 'string' },
        { name: 'hs_email_is_ineligible', type: 'bool' },
        { name: 'hs_language', type: 'enumeration' },
        { name: 'hs_analytics_first_referrer', type: 'string' },
        { name: 'jobtitle', type: 'string' },
        { name: 'hs_analytics_last_referrer', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'closedate', type: 'datetime' },
        { name: 'hs_analytics_average_page_views', type: 'number' },
        { name: 'hs_analytics_revenue', type: 'number' },
        { name: 'hs_lifecyclestage_lead_date', type: 'datetime' },
        {
          name: 'hs_lifecyclestage_marketingqualifiedlead_date',
          type: 'datetime',
        },
        { name: 'hs_lifecyclestage_opportunity_date', type: 'datetime' },
        { name: 'lifecyclestage', type: 'enumeration' },
        { name: 'hs_lifecyclestage_salesqualifiedlead_date', type: 'datetime' },
        { name: 'createdate', type: 'datetime' },
        { name: 'hs_lifecyclestage_evangelist_date', type: 'datetime' },
        { name: 'hs_lifecyclestage_customer_date', type: 'datetime' },
        { name: 'hubspotscore', type: 'number' },
        { name: 'company', type: 'string' },
        { name: 'hs_lifecyclestage_subscriber_date', type: 'datetime' },
        { name: 'hs_lifecyclestage_other_date', type: 'datetime' },
        { name: 'website', type: 'string' },
        { name: 'numemployees', type: 'enumeration' },
        { name: 'annualrevenue', type: 'string' },
        { name: 'industry', type: 'string' },
        { name: 'associatedcompanyid', type: 'number' },
        { name: 'associatedcompanylastupdated', type: 'number' },
        { name: 'hs_predictivecontactscorebucket', type: 'enumeration' },
        { name: 'hs_predictivecontactscore', type: 'number' },
      ],
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/properties/v1/contacts/properties',
      method: 'GET',
    },
    httpRes: {
      status: 200,
      data: [
        { name: 'company_size', type: 'string' },
        { name: 'date_of_birth', type: 'string' },
        { name: 'days_to_close', type: 'number' },
        {
          name: 'date_submitted',
          type: 'date',
        },
        {
          name: 'date_created',
          type: 'date',
        },
        {
          name: 'date_closed',
          type: 'date',
        },
        { name: 'degree', type: 'string' },
        { name: 'field_of_study', type: 'string' },
        { name: 'first_conversion_date', type: 'datetime' },
        { name: 'first_conversion_event_name', type: 'string' },
        { name: 'first_deal_created_date', type: 'datetime' },
        { name: 'gender', type: 'string' },
        { name: 'graduation_date', type: 'string' },
        { name: 'hs_additional_emails', type: 'enumeration' },
        { name: 'hs_all_contact_vids', type: 'enumeration' },
        {
          name: 'hs_analytics_first_touch_converting_campaign',
          type: 'string',
        },
        { name: 'hs_analytics_last_touch_converting_campaign', type: 'string' },
        { name: 'hs_avatar_filemanager_key', type: 'string' },
        { name: 'hs_calculated_form_submissions', type: 'enumeration' },
        { name: 'hs_calculated_merged_vids', type: 'enumeration' },
        { name: 'hs_calculated_mobile_number', type: 'string' },
        { name: 'hs_calculated_phone_number', type: 'string' },
        { name: 'hs_calculated_phone_number_area_code', type: 'string' },
        { name: 'hs_calculated_phone_number_country_code', type: 'string' },
        { name: 'hs_calculated_phone_number_region_code', type: 'string' },
        { name: 'hs_content_membership_email_confirmed', type: 'bool' },
        { name: 'hs_content_membership_notes', type: 'string' },
        { name: 'hs_content_membership_registered_at', type: 'datetime' },
        {
          name: 'hs_content_membership_registration_domain_sent_to',
          type: 'string',
        },
        {
          name: 'hs_content_membership_registration_email_sent_at',
          type: 'datetime',
        },
        { name: 'hs_content_membership_status', type: 'enumeration' },
        { name: 'hs_conversations_visitor_email', type: 'string' },
        { name: 'hs_created_by_conversations', type: 'bool' },
        { name: 'hs_created_by_user_id', type: 'string' },
        { name: 'hs_createdate', type: 'datetime' },
        { name: 'hs_document_last_revisited', type: 'datetime' },
        { name: 'hs_email_domain', type: 'string' },
        { name: 'hs_email_quarantined', type: 'bool' },
        { name: 'hs_email_quarantined_reason', type: 'enumeration' },
        { name: 'hs_email_recipient_fatigue_recovery_time', type: 'datetime' },
        { name: 'hs_email_sends_since_last_engagement', type: 'number' },
        { name: 'hs_emailconfirmationstatus', type: 'enumeration' },
        { name: 'hs_facebook_ad_clicked', type: 'bool' },
        { name: 'hs_feedback_last_nps_follow_up', type: 'string' },
        { name: 'hs_feedback_last_nps_rating', type: 'enumeration' },
        { name: 'hs_feedback_last_survey_date', type: 'datetime' },
        { name: 'hs_feedback_show_nps_web_survey', type: 'bool' },
        { name: 'hs_google_click_id', type: 'string' },
        { name: 'hs_ip_timezone', type: 'string' },
        { name: 'hs_is_contact', type: 'bool' },
        { name: 'hs_last_sales_activity_date', type: 'datetime' },
        { name: 'hs_lastmodifieddate', type: 'datetime' },
        { name: 'hs_lead_status', type: 'enumeration' },
        { name: 'hs_legal_basis', type: 'enumeration' },
        { name: 'hs_merged_object_ids', type: 'enumeration' },
        { name: 'hs_object_id', type: 'number' },
        { name: 'hs_predictivecontactscore_v2', type: 'number' },
        { name: 'hs_predictivescoringtier', type: 'enumeration' },
        { name: 'hs_sales_email_last_clicked', type: 'datetime' },
        { name: 'hs_sales_email_last_opened', type: 'datetime' },
        {
          name: 'hs_searchable_calculated_international_mobile_number',
          type: 'phone_number',
        },
        {
          name: 'hs_searchable_calculated_international_phone_number',
          type: 'phone_number',
        },
        {
          name: 'hs_searchable_calculated_mobile_number',
          type: 'phone_number',
        },
        { name: 'hs_searchable_calculated_phone_number', type: 'phone_number' },
        { name: 'hs_sequences_is_enrolled', type: 'bool' },
        { name: 'hs_updated_by_user_id', type: 'string' },
        { name: 'hubspot_owner_assigneddate', type: 'datetime' },
        { name: 'ip_city', type: 'string' },
        { name: 'ip_country', type: 'string' },
        { name: 'ip_country_code', type: 'string' },
        { name: 'ip_latlon', type: 'string' },
        { name: 'ip_state', type: 'string' },
        { name: 'ip_state_code', type: 'string' },
        { name: 'ip_zipcode', type: 'string' },
        { name: 'job_function', type: 'string' },
        { name: 'lastmodifieddate', type: 'datetime' },
        { name: 'marital_status', type: 'string' },
        { name: 'military_status', type: 'string' },
        { name: 'num_associated_deals', type: 'number' },
        { name: 'num_conversion_events', type: 'number' },
        { name: 'num_unique_conversion_events', type: 'number' },
        { name: 'recent_conversion_date', type: 'datetime' },
        { name: 'recent_conversion_event_name', type: 'string' },
        { name: 'recent_deal_amount', type: 'number' },
        { name: 'recent_deal_close_date', type: 'datetime' },
        { name: 'relationship_status', type: 'string' },
        { name: 'school', type: 'string' },
        { name: 'seniority', type: 'string' },
        { name: 'start_date', type: 'string' },
        { name: 'test_date', type: 'date' },
        { name: 'test_key', type: 'string' },
        { name: 'test_prop', type: 'string' },
        { name: 'test_property', type: 'string' },
        { name: 'total_revenue', type: 'number' },
        { name: 'work_email', type: 'string' },
        { name: 'firstname', type: 'string' },
        { name: 'hs_analytics_first_url', type: 'string' },
        { name: 'hs_email_delivered', type: 'number' },
        { name: 'hs_email_optout_7283808', type: 'enumeration' },
        { name: 'twitterhandle', type: 'string' },
        { name: 'currentlyinworkflow', type: 'enumeration' },
        { name: 'hs_analytics_last_url', type: 'string' },
        { name: 'hs_email_open', type: 'number' },
        { name: 'fax', type: 'string' },
        { name: 'hs_analytics_first_timestamp', type: 'datetime' },
        { name: 'hs_email_last_email_name', type: 'string' },
        { name: 'hs_email_last_send_date', type: 'datetime' },
        { name: 'address', type: 'string' },
        { name: 'engagements_last_meeting_booked', type: 'datetime' },
        { name: 'engagements_last_meeting_booked_campaign', type: 'string' },
        { name: 'engagements_last_meeting_booked_medium', type: 'string' },
        { name: 'engagements_last_meeting_booked_source', type: 'string' },
        { name: 'hs_analytics_first_visit_timestamp', type: 'datetime' },
        { name: 'hs_email_last_open_date', type: 'datetime' },
        { name: 'hs_sales_email_last_replied', type: 'datetime' },
        { name: 'hubspot_owner_id', type: 'enumeration' },
        { name: 'notes_last_contacted', type: 'datetime' },
        { name: 'notes_last_updated', type: 'datetime' },
        { name: 'notes_next_activity_date', type: 'datetime' },
        { name: 'num_contacted_notes', type: 'number' },
        { name: 'num_notes', type: 'number' },
        { name: 'surveymonkeyeventlastupdated', type: 'number' },
        { name: 'webinareventlastupdated', type: 'number' },
        { name: 'city', type: 'string' },
        { name: 'hs_analytics_last_timestamp', type: 'datetime' },
        { name: 'hs_email_last_click_date', type: 'datetime' },
        { name: 'hubspot_team_id', type: 'enumeration' },
        { name: 'hs_all_owner_ids', type: 'enumeration' },
        { name: 'hs_analytics_last_visit_timestamp', type: 'datetime' },
        { name: 'hs_email_first_send_date', type: 'datetime' },
        { name: 'state', type: 'string' },
        { name: 'hs_all_team_ids', type: 'enumeration' },
        { name: 'hs_analytics_source', type: 'enumeration' },
        { name: 'hs_email_first_open_date', type: 'datetime' },
        { name: 'zip', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'hs_all_accessible_team_ids', type: 'enumeration' },
        { name: 'hs_analytics_source_data_1', type: 'string' },
        { name: 'hs_email_first_click_date', type: 'datetime' },
        { name: 'hs_analytics_source_data_2', type: 'string' },
        { name: 'hs_email_is_ineligible', type: 'bool' },
        { name: 'hs_language', type: 'enumeration' },
        { name: 'hs_analytics_first_referrer', type: 'string' },
        { name: 'jobtitle', type: 'string' },
        { name: 'hs_analytics_last_referrer', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'closedate', type: 'datetime' },
        { name: 'hs_analytics_average_page_views', type: 'number' },
        { name: 'hs_analytics_revenue', type: 'number' },
        { name: 'hs_lifecyclestage_lead_date', type: 'datetime' },
        {
          name: 'hs_lifecyclestage_marketingqualifiedlead_date',
          type: 'datetime',
        },
        { name: 'hs_lifecyclestage_opportunity_date', type: 'datetime' },
        { name: 'lifecyclestage', type: 'enumeration' },
        { name: 'hs_lifecyclestage_salesqualifiedlead_date', type: 'datetime' },
        { name: 'createdate', type: 'datetime' },
        { name: 'hs_lifecyclestage_evangelist_date', type: 'datetime' },
        { name: 'hs_lifecyclestage_customer_date', type: 'datetime' },
        { name: 'hubspotscore', type: 'number' },
        { name: 'company', type: 'string' },
        { name: 'hs_lifecyclestage_subscriber_date', type: 'datetime' },
        { name: 'hs_lifecyclestage_other_date', type: 'datetime' },
        { name: 'website', type: 'string' },
        { name: 'numemployees', type: 'enumeration' },
        { name: 'annualrevenue', type: 'string' },
        { name: 'industry', type: 'string' },
        { name: 'associatedcompanyid', type: 'number' },
        { name: 'associatedcompanylastupdated', type: 'number' },
        { name: 'hs_predictivecontactscorebucket', type: 'enumeration' },
        { name: 'hs_predictivecontactscore', type: 'number' },
      ],
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
      method: 'POST',
      headers: {
        Authorization: 'Bearer dummy-access-token',
      },
    },
    httpRes: {
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
      method: 'POST',
      headers: {
        Authorization: 'Bearer dummy-access-tokensuccess',
      },
    },
    httpRes: {
      data: {
        total: 1,
        results: [
          {
            id: '103604',
            properties: {
              createdate: '2022-07-15T15:25:08.975Z',
              email: 'testhubspot@email.com',
              hs_object_id: '103604',
              lastmodifieddate: '2022-07-15T15:26:49.590Z',
            },
            createdAt: '2022-07-15T15:25:08.975Z',
            updatedAt: '2022-07-15T15:26:49.590Z',
            archived: false,
          },
        ],
      },
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer dummy-access-token-hs-additonal-email',
      },
    },
    httpRes: {
      data: {
        total: 1,
        results: [
          {
            id: '103689',
            properties: {
              createdate: '2022-07-15T15:25:08.975Z',
              email: 'primary@email.com',
              hs_object_id: '103604',
              hs_additional_emails: 'abc@extraemail.com;secondary@email.com',
              lastmodifieddate: '2022-07-15T15:26:49.590Z',
            },
            createdAt: '2022-07-15T15:25:08.975Z',
            updatedAt: '2022-07-15T15:26:49.590Z',
            archived: false,
          },
        ],
      },
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
      method: 'POST',
      headers: {
        Authorization: 'Bearer dummy-access-tokenmultiple',
      },
    },
    httpRes: {
      data: {
        total: 2,
        results: [
          {
            id: '103604',
            properties: {
              createdate: '2022-07-15T15:25:08.975Z',
              email: 'testhubspot@email.com',
              hs_object_id: '103604',
              lastmodifieddate: '2022-07-15T15:26:49.590Z',
            },
            createdAt: '2022-07-15T15:25:08.975Z',
            updatedAt: '2022-07-15T15:26:49.590Z',
            archived: false,
          },
          {
            id: '103604',
            properties: {
              createdate: '2022-07-15T15:25:08.975Z',
              email: 'testhubspot@email.com',
              hs_object_id: '103604',
              lastmodifieddate: '2022-07-15T15:26:49.590Z',
            },
            createdAt: '2022-07-15T15:25:08.975Z',
            updatedAt: '2022-07-15T15:26:49.590Z',
            archived: false,
          },
        ],
      },
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/lead/search',
      method: 'POST',
    },
    httpRes: {
      status: 200,
      data: {
        total: 1,
        results: [
          {
            id: '103605',
            properties: {
              createdate: '2022-08-15T15:25:08.975Z',
              email: 'testhubspot2@email.com',
              hs_object_id: '103605',
              lastmodifieddate: '2022-08-15T15:26:49.590Z',
            },
            createdAt: '2022-08-15T15:25:08.975Z',
            updatedAt: '2022-08-15T15:26:49.590Z',
            archived: false,
          },
        ],
      },
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/lead/search?hapikey=dummy-apikey',
      method: 'POST',
    },
    httpRes: {
      data: {
        total: 1,
        results: [
          {
            id: '103605',
            properties: {
              createdate: '2022-08-15T15:25:08.975Z',
              email: 'testhubspot2@email.com',
              hs_object_id: '103605',
              lastmodifieddate: '2022-08-15T15:26:49.590Z',
            },
            createdAt: '2022-08-15T15:25:08.975Z',
            updatedAt: '2022-08-15T15:26:49.590Z',
            archived: false,
          },
        ],
      },
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/lead/search?hapikey=rate-limit-id',
      method: 'POST',
    },
    httpRes: {
      data: {
        status: 'error',
        message: 'Request Rate Limit reached',
        correlationId: '4d39ff11-e121-4514-bcd8-132a9dd1ff50',
        category: 'RATE-LIMIT_REACHED',
        links: {
          'api key': 'https://app.hubspot.com/l/api-key/',
        },
      },
      status: 429,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=dummy-apikey',
      method: 'POST',
    },
    httpRes: {
      data: {
        total: 1,
        results: [
          {
            id: '103604',
            properties: {
              createdate: '2022-07-15T15:25:08.975Z',
              email: 'testhubspot@email.com',
              hs_object_id: '103604',
              lastmodifieddate: '2022-07-15T15:26:49.590Z',
            },
            createdAt: '2022-07-15T15:25:08.975Z',
            updatedAt: '2022-07-15T15:26:49.590Z',
            archived: false,
          },
        ],
      },
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=dummy-apikeysuccess',
      method: 'POST',
    },
    httpRes: {
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/properties/v1/contacts/properties?hapikey=dummy-apikeysuccess',
      method: 'GET',
    },
    httpRes: {
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/properties/v1/contacts/properties?hapikey=rate-limit-id',
      method: 'GET',
    },
    httpRes: {
      data: {
        status: 'error',
        message: 'Request Rate Limit reached',
        correlationId: '4d39ff11-e121-4514-bcd8-132a9dd1ff50',
        category: 'RATE-LIMIT_REACHED',
        links: {
          'api key': 'https://app.hubspot.com/l/api-key/',
        },
      },
      status: 429,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/properties/v1/contacts/properties?hapikey=invalid-api-key',
      method: 'GET',
    },
    httpRes: {
      data: {
        status: 'error',
        message:
          'The API key provided is invalid. View or manage your API key here: https://app.hubspot.com/l/api-key/',
        correlationId: '4d39ff11-e121-4514-bcd8-132a9dd1ff50',
        category: 'INVALID_AUTHENTICATION',
        links: {
          'api key': 'https://app.hubspot.com/l/api-key/',
        },
      },
      status: 401,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/association/search',
      method: 'POST',
    },
    httpRes: {
      status: 200,
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/batch/update',
      method: 'POST',
      data: {
        inputs: [
          {
            properties: {
              firstname: 'testmail1217',
            },
            id: '12877907024',
          },
          {
            properties: {
              firstname: 'test1',
              email: 'test1@mail.com',
            },
            id: '12877907025',
          },
        ],
      },
    },
    httpRes: {
      status: 200,
      data: {
        status: 'COMPLETE',
        results: [
          {
            id: '12877907025',
            properties: {
              createdate: '2024-04-16T09:50:16.034Z',
              email: 'test1@mail.com',
              firstname: 'test1',
              hs_is_unworked: 'true',
              hs_object_id: '12877907025',
              hs_pipeline: 'contacts-lifecycle-pipeline',
              lastmodifieddate: '2024-04-23T11:52:03.723Z',
              lifecyclestage: 'lead',
            },
            createdAt: '2024-04-16T09:50:16.034Z',
            updatedAt: '2024-04-23T11:52:03.723Z',
            archived: false,
          },
          {
            id: '12877907024',
            properties: {
              createdate: '2024-04-16T09:50:16.034Z',
              firstname: 'testmail1217',
              hs_is_unworked: 'true',
              hs_object_id: '12877907024',
              hs_pipeline: 'contacts-lifecycle-pipeline',
              lastmodifieddate: '2024-04-23T11:52:03.723Z',
              lifecyclestage: 'lead',
            },
            createdAt: '2024-04-16T09:50:16.034Z',
            updatedAt: '2024-04-23T11:52:03.723Z',
            archived: false,
          },
        ],
        startedAt: '2024-04-24T05:11:51.090Z',
        completedAt: '2024-04-24T05:11:51.190Z',
      },
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/batch/update',
      method: 'POST',
      data: {
        inputs: [
          {
            properties: {
              firstname: 'test5',
              email: 'test1@mail.com',
            },
            id: '12877907025',
          },
          {
            properties: {
              firstname: 'testmail1217',
              email: 'test1@mail.com',
            },
            id: '12877907025',
          },
        ],
      },
    },
    httpRes: {
      status: 400,
      data: {
        status: 'error',
        message: 'Duplicate IDs found in batch input: [12877907025]. IDs must be unique',
        correlationId: 'd24ec5cd-8998-4674-a928-59603ae6b0eb',
        context: {
          ids: ['12877907025'],
        },
        category: 'VALIDATION_ERROR',
      },
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/batch/update',
      method: 'POST',
      data: {
        inputs: [
          [
            {
              properties: {
                firstname: 'test1',
                email: 'test1@mail.com',
              },
            },
            {
              properties: {
                firstname: 'testmail1217',
                email: 'testmail1217@testmail.com',
              },
            },
            {
              properties: {
                firstname: 'test5',
                email: 'test5@xmail.con',
              },
            },
          ],
        ],
      },
    },
    httpRes: {
      status: 400,
      data: {
        status: 'error',
        message:
          'Invalid input JSON on line 3, column 9: Cannot deserialize value of type `com.hubspot.inbounddb.publicobject.core.v2.SimplePublicObjectBatchInput$Json` from Array value (token `JsonToken.START_ARRAY`)',
        correlationId: '99df04b9-da11-4504-bd97-2c15f58d0943',
      },
    },
  },
  {
    httpReq: {
      url: 'https://api.hubapi.com/crm/v3/objects/contacts/batch/update',
      method: 'POST',
      data: {
        inputs: [
          {
            properties: {
              firstname: 'testmail12178',
            },
            id: '12877907024',
          },
          {
            properties: {
              firstname: 'test1',
              email: 'test1@mail.com',
            },
            id: '12877907025',
          },
        ],
      },
    },
    httpRes: {
      status: 200,
      data: {
        message: 'unknown response',
      },
    },
  },
];
