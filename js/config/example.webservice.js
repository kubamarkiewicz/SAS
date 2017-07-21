
/* This file has to loaded before app.js */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {


        "user_login"                    : "dummy-webservice/user_login.json",
        "user_has_access"               : "dummy-webservice/user_has_access.json",

        "get_alerts"                    : "dummy-webservice/get_alerts.json",
        "get_blocked_products"          : "dummy-webservice/get_blocked_products.json",
        "data_get_popup_alerts"         : "dummy-webservice/get_popup_alerts.json",
        "data_get_signals_L9_flow"      : "dummy-webservice/data_get_signals_L9_flow.json",
        "data_get_signals_M1_flow"      : "dummy-webservice/data_get_signals_M1_flow.json",
        "data_get_edi_files_flow"       : "dummy-webservice/data_get_edi_files_flow.json",
        "data_get_glt_wires_flow"       : "dummy-webservice/data_get_glt_wires_flow.json",

        "get_agvs"                      : "dummy-webservice/get_agvs.json",
        "update_agv"                    : "dummy-webservice/empty.json",
        "get_storage_position_niches"   : "dummy-webservice/get_storage_position_niches.json",
        "get_semaphores"                : "dummy-webservice/get_semaphores.json",
        "update_semaphore"              : "dummy-webservice/empty.json",
        "get_transport_belts"           : "dummy-webservice/get_transport_belts.json",
        "update_transport_belt"         : "dummy-webservice/empty.json",
        "process_get_popup_alerts"      : "dummy-webservice/get_popup_alerts.json",

        "get_readers_for_blocking"      : "dummy-webservice/get_readers.json",
        "blockings_get_blocked_products": "dummy-webservice/get_blocked_products.json",
        "block_products"                : "dummy-webservice/block_products.json",
        "unblock_products"              : "dummy-webservice/unblock_products.json",
        "select_reader_for_blocking"    : "dummy-webservice/select_reader.json",
        "get_reading_for_blocking"      : "dummy-webservice/get_reader_reading.json",
        "block_products_from_file"      : "dummy-webservice/block_products_from_file.json",
        "unblock_products_from_file"    : "dummy-webservice/unblock_products_from_file.json",

        "get_readers_for_receiving"     : "dummy-webservice/get_readers.json",
        "receive_products"              : "dummy-webservice/receive_products.json",
        "select_reader_for_receiving"   : "dummy-webservice/select_reader.json",
        "get_reading_for_receiving"     : "dummy-webservice/get_reading_for_manual_mode.json",
        "receive_products_from_file"    : "dummy-webservice/receive_products_from_file.json",
        
        "get_readers_for_manual_mode"   : "dummy-webservice/get_readers.json",
        "get_actions"                   : "dummy-webservice/get_actions.json",
        "select_reader_for_manual_mode" : "dummy-webservice/select_reader.json",
        "get_reading_for_manual_mode"   : "dummy-webservice/get_reading_for_manual_mode.json",
        "select_action"                 : "dummy-webservice/select_action.json",
        "manual_get_file_actions"       : "dummy-webservice/manual_get_file_actions.json",
        "upload_actions_file"           : "dummy-webservice/upload_actions_file.json",
        "manual_get_pdf_actions"        : "dummy-webservice/manual_get_pdf_actions.json",
        "manual_generate_pdf"           : "dummy-webservice/manual_generate_pdf.pdf",

        "get_parameters"                : "dummy-webservice/get_parameters.json",
        "save_parameters"               : "dummy-webservice/empty.json",
        "parameters_get_pause_status"   : "dummy-webservice/parameters_get_pause_status.json",

        "vis_reception_get_glt_in_asn"      : "dummy-webservice/vis_reception_get_glt_in_asn.json",
        "vis_reception_get_asn"             : "dummy-webservice/vis_reception_get_asn.json",
        "vis_reception_get_read_in_process" : "dummy-webservice/vis_reception_get_read_in_process.json",
        "vis_reception_get_alerts"          : "dummy-webservice/vis_reception_get_alerts.json",
        "vis_reception_get_glt_incoming"    : "dummy-webservice/vis_reception_get_glt_incoming.json",

        "enter_Data"                    : "dummy-webservice/empty.json",
        "enter_Reception"               : "dummy-webservice/empty.json",
        "enter_Lockings"                : "dummy-webservice/empty.json",
        "enter_Manual"                  : "dummy-webservice/empty.json",
        "enter_Process"                 : "dummy-webservice/empty.json",
        "enter_Parameters"              : "dummy-webservice/empty.json",
        "enter_Login"                   : "dummy-webservice/empty.json",

        "exit_Data"                     : "dummy-webservice/empty.json",
        "exit_Reception"                : "dummy-webservice/empty.json",
        "exit_Lockings"                 : "dummy-webservice/empty.json",
        "exit_Manual"                   : "dummy-webservice/empty.json",
        "exit_Process"                  : "dummy-webservice/empty.json",
        "exit_Parameters"               : "dummy-webservice/empty.json",


/*

        "user_login"                    : "http://192.168.0.89:8888/SAS/Login/api/user_login",
        "user_has_access"               : "http://192.168.0.89:8888/SAS/Login/api/user_has_access",

        "get_alerts"                    : "http://192.168.0.89:8888/SAS/Data/api/get_alerts",
        "get_blocked_products"          : "http://192.168.0.89:8888/SAS/Data/api/get_blocked_products",
        "data_get_popup_alerts"         : "http://192.168.0.89:8888/SAS/Data/api/get_popup_alerts",
        "data_get_signals_L9_flow"      : "http://192.168.0.89:8888/SAS/Data/api/data_get_signals_L9_flow",
        "data_get_signals_M1_flow"      : "http://192.168.0.89:8888/SAS/Data/api/data_get_signals_M1_flow",
        "data_get_edi_files_flow"       : "http://192.168.0.89:8888/SAS/Data/api/data_get_edi_files_flow",
        "data_get_glt_wires_flow"       : "http://192.168.0.89:8888/SAS/Data/api/data_get_glt_wires_flow",

        "get_agvs"                      : "http://192.168.0.89:8888/SAS/Process/api/get_agvs",
        "update_agv"                    : "http://192.168.0.89:8888/SAS/Process/api/update_agv",
        "get_storage_position_niches"   : "http://192.168.0.89:8888/SAS/Process/api/get_storage_position_niches",
        "get_semaphores"                : "http://192.168.0.89:8888/SAS/Process/api/get_semaphores",
        "update_semaphore"              : "http://192.168.0.89:8888/SAS/Process/api/update_semaphore",
        "get_transport_belts"           : "http://192.168.0.89:8888/SAS/Process/api/get_transport_belts",
        "update_transport_belt"         : "http://192.168.0.89:8888/SAS/Process/api/update_transport_belt",
        "process_get_popup_alerts"      : "http://192.168.0.89:8888/SAS/Process/api/get_popup_alerts",

        "get_readers_for_blocking"      : "http://192.168.0.89:8888/SAS/Lockings/api/get_readers",
        "blockings_get_blocked_products": "http://192.168.0.89:8888/SAS/Lockings/api/get_blocked_products",
        "block_products"                : "http://192.168.0.89:8888/SAS/Lockings/api/block_products",
        "unblock_products"              : "http://192.168.0.89:8888/SAS/Lockings/api/unblock_products",
        "select_reader_for_blocking"    : "http://192.168.0.89:8888/SAS/Lockings/api/select_reader",
        "get_reading_for_blocking"      : "http://192.168.0.89:8888/SAS/Lockings/api/get_reader_reading",
        "block_products_from_file"      : "http://192.168.0.89:8888/SAS/Lockings/api/block_products_from_file",
        "unblock_products_from_file"    : "http://192.168.0.89:8888/SAS/Lockings/api/unblock_products_from_file",

        "get_readers_for_receiving"     : "http://192.168.0.89:8888/SAS/Reception/api/get_readers",
        "receive_products"              : "http://192.168.0.89:8888/SAS/Reception/api/receive_products",
        "select_reader_for_receiving"   : "http://192.168.0.89:8888/SAS/Reception/api/select_reader",
        "get_reading_for_receiving"     : "http://192.168.0.89:8888/SAS/Reception/api/get_reader_reading",
        "receive_products_from_file"    : "http://192.168.0.89:8888/SAS/Reception/api/receive_products_from_file",

        "get_readers_for_manual_mode"   : "http://192.168.0.89:8888/SAS/Manual/api/get_readers",
        "get_actions"                   : "http://192.168.0.89:8888/SAS/Manual/api/get_actions",
        "select_reader_for_manual_mode" : "http://192.168.0.89:8888/SAS/Manual/api/select_reader",
        "get_reading_for_manual_mode"   : "http://192.168.0.89:8888/SAS/Manual/api/get_reader_reading",
        "select_action"                 : "http://192.168.0.89:8888/SAS/Manual/api/select_action",
        "manual_get_file_actions"       : "http://192.168.0.89:8888/SAS/Manual/api/get_file_actions",
        "upload_actions_file"           : "http://192.168.0.89:8888/SAS/Manual/api/upload_actions_file",
        "manual_get_pdf_actions"        : "http://192.168.0.89:8888/SAS/Manual/api/get_pdf_actions",
        "manual_generate_pdf"           : "http://192.168.0.89:8888/SAS/Manual/api/generate_pdf",

        "get_parameters"                : "http://192.168.0.89:8888/SAS/Parameters/api/get_parameters",
        "save_parameters"               : "http://192.168.0.89:8888/SAS/Parameters/api/save_parameters",

        "vis_reception_get_glt_in_asn"      : "dummy-webservice/reception_get_glt_in_asn.json",
        "vis_reception_get_asn"             : "dummy-webservice/reception_get_asn.json",
        "vis_reception_get_read_in_process" : "dummy-webservice/reception_get_read_in_process.json",
        "vis_reception_get_alerts"          : "dummy-webservice/reception_get_alerts.json",
        "vis_reception_get_glt_incoming"    : "dummy-webservice/reception_get_glt_incoming.json",

        "enter_Data"                    : "http://192.168.0.89:8888/SAS/Data/api/enter_Data",
        "enter_Reception"               : "http://192.168.0.89:8888/SAS/Reception/api/enter_Reception",
        "enter_Lockings"                : "http://192.168.0.89:8888/SAS/Lockings/api/enter_Lockings",
        "enter_Manual"                  : "http://192.168.0.89:8888/SAS/Manual/api/enter_Manual",
        "enter_Process"                 : "http://192.168.0.89:8888/SAS/Process/api/enter_Process",
        "enter_Parameters"              : "http://192.168.0.89:8888/SAS/Parameters/api/enter_Parameters",
        "enter_Login"                   : "http://192.168.0.89:8888/SAS/Login/api/enter_Login",

        "exit_Data"                     : "http://192.168.0.89:8888/SAS/Data/api/exit_Data",
        "exit_Reception"                : "http://192.168.0.89:8888/SAS/Reception/api/exit_Reception",
        "exit_Lockings"                 : "http://192.168.0.89:8888/SAS/Lockings/api/exit_Lockings",
        "exit_Manual"                   : "http://192.168.0.89:8888/SAS/Manual/api/exit_Manual",
        "exit_Process"                  : "http://192.168.0.89:8888/SAS/Process/api/exit_Process",
        "exit_Parameters"               : "http://192.168.0.89:8888/SAS/Parameters/api/exit_Parameters",
*/

    }

}