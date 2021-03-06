
/* Rename this file to "webservice.js" */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {
            
        "user_login"                    			: "http://192.168.1.69:8888/SAS/Login/api/user_login",   
        "user_has_access"               			: "http://192.168.1.69:8888/SAS/Login/api/user_has_access",
                
        "get_alerts"                    			: "http://192.168.1.69:8888/SAS/Data/api/get_alerts",
        "get_blocked_products"          			: "http://192.168.1.69:8888/SAS/Data/api/get_blocked_products",
        "get_blocked_products"          			: "http://192.168.1.69:8888/SAS/Data/api/get_blocked_products",
        "data_get_popup_alerts"        				: "http://192.168.1.69:8888/SAS/Data/api/get_popup_alerts",
        "data_delete_popup_alert"       			: "http://192.168.1.69:8888/SAS/Data/api/delete_popup_alert",
        "data_get_signals_L9_flow"      			: "http://192.168.1.69:8888/SAS/Data/api/data_get_signals_L9_flow",
        "data_get_signals_M1_flow"      			: "http://192.168.1.69:8888/SAS/Data/api/data_get_signals_M1_flow",
        "data_get_edi_files_flow"       			: "http://192.168.1.69:8888/SAS/Data/api/data_get_edi_files_flow",
        "data_get_glt_wires_flow"       			: "http://192.168.1.69:8888/SAS/Data/api/data_get_glt_wires_flow",
                
        "get_agvs"                      			: "http://192.168.1.69:8888/SAS/Process/api/get_agvs",
        "update_agv"                    			: "http://192.168.1.69:8888/SAS/Process/api/update_agv",
        "get_storage_position_niches"   			: "http://192.168.1.69:8888/SAS/Process/api/get_storage_position_niches",
        "get_semaphores"                			: "http://192.168.1.69:8888/SAS/Process/api/get_semaphores",
        "update_semaphore"              			: "http://192.168.1.69:8888/SAS/Process/api/update_semaphore",
        "get_transport_belts"           			: "http://192.168.1.69:8888/SAS/Process/api/get_transport_belts",
        "update_transport_belt"         			: "http://192.168.1.69:8888/SAS/Process/api/update_transport_belt",
        "process_get_popup_alerts"      			: "http://192.168.1.69:8888/SAS/Process/api/get_popup_alerts",
                
        "get_readers_for_blocking"      			: "http://192.168.1.69:8888/SAS/Lockings/api/get_readers",
        "blockings_get_blocked_products"			: "http://192.168.1.69:8888/SAS/Lockings/api/get_blocked_products",
        "block_products"                			: "http://192.168.1.69:8888/SAS/Lockings/api/block_products",
        "unblock_products"              			: "http://192.168.1.69:8888/SAS/Lockings/api/unblock_products",
        "select_reader_for_blocking"    			: "http://192.168.1.69:8888/SAS/Lockings/api/select_reader",
        "get_reading_for_blocking"      			: "http://192.168.1.69:8888/SAS/Lockings/api/get_reader_reading",
        "block_products_from_file"      			: "http://192.168.1.69:8888/SAS/Lockings/api/block_products_from_file",
        "unblock_products_from_file"    			: "http://192.168.1.69:8888/SAS/Lockings/api/unblock_products_from_file",
                
        "get_readers_for_receiving"     			: "http://192.168.1.69:8888/SAS/Reception/api/get_readers",
        "receive_products"              			: "http://192.168.1.69:8888/SAS/Reception/api/receive_products",
        "select_reader_for_receiving"   			: "http://192.168.1.69:8888/SAS/Reception/api/select_reader",
        "get_reading_for_receiving"     			: "http://192.168.1.69:8888/SAS/Reception/api/get_reader_reading",
        "receive_products_from_file"    			: "http://192.168.1.69:8888/SAS/Reception/api/receive_products_from_file",
                
        "get_readers_for_manual_mode"   			: "http://192.168.1.69:8888/SAS/Manual/api/get_readers",
        "get_actions"                   			: "http://192.168.1.69:8888/SAS/Manual/api/get_actions",
        "select_reader_for_manual_mode" 			: "http://192.168.1.69:8888/SAS/Manual/api/select_reader",
        "get_reading_for_manual_mode"   			: "http://192.168.1.69:8888/SAS/Manual/api/get_reader_reading",
        "select_action"                 			: "http://192.168.1.69:8888/SAS/Manual/api/select_action",
        "manual_get_file_actions"       			: "http://192.168.1.69:8888/SAS/Manual/api/get_file_actions",
        "upload_actions_file"           			: "http://192.168.1.69:8888/SAS/Manual/api/upload_actions_file",
        "manual_get_notification_actions"        	: "http://192.168.1.69:8888/SAS/Manual/api/get_notification_actions",
        "manual_generate_notification"           	: "http://192.168.1.69:8888/SAS/Manual/api/generate_notification",
                
        "get_parameters"                			: "http://192.168.1.69:8888/SAS/Parameters/api/get_parameters",
        "save_parameters"               			: "http://192.168.1.69:8888/SAS/Parameters/api/save_parameters",
                
        "vis_reception_get_glt_in_asn"      		: "http://192.168.1.69:8888/SAS/VReception/api/get_glt_in_asn",
        "vis_reception_get_asn"             		: "http://192.168.1.69:8888/SAS/VReception/api/get_asn",
        "vis_reception_get_read_in_process" 		: "http://192.168.1.69:8888/SAS/VReception/api/get_read_in_process",
        "vis_reception_get_alerts"          		: "http://192.168.1.69:8888/SAS/VReception/api/get_alerts",
        "vis_reception_get_glt_incoming"    		: "http://192.168.1.69:8888/SAS/VReception/api/get_glt_incoming",
        "vis_reception_generate_notification" 		: "http://192.168.1.69:8888/SAS/VReception/api/generate_notification",

        "localizacion_articulos_search_article" 	: "http://192.168.1.69:8888/SAS/LocalizacionArticulos/api/search_article",
                
        "enter_Login"                   : "http://192.168.1.69:8888/SAS/Login/api/enter_Login",
        "enter_Data"                    : "http://192.168.1.69:8888/SAS/Data/api/enter_Data",
        "enter_Reception"               : "http://192.168.1.69:8888/SAS/Reception/api/enter_Reception",
        "enter_Lockings"                : "http://192.168.1.69:8888/SAS/Lockings/api/enter_Lockings",
        "enter_Manual"                  : "http://192.168.1.69:8888/SAS/Manual/api/enter_Manual",
        "enter_Process"                 : "http://192.168.1.69:8888/SAS/Process/api/enter_Process",
        "enter_Parameters"              : "http://192.168.1.69:8888/SAS/Parameters/api/enter_Parameters",
        "enter_VisuReception"           : "http://192.168.1.69:8888/SAS/VReception/api/enter_VReception",
                
        "exit_Data"                     : "http://192.168.1.69:8888/SAS/Data/api/exit_Data",
        "exit_Reception"                : "http://192.168.1.69:8888/SAS/Reception/api/exit_Reception",
        "exit_Lockings"                 : "http://192.168.1.69:8888/SAS/Lockings/api/exit_Lockings",
        "exit_Manual"                   : "http://192.168.1.69:8888/SAS/Manual/api/exit_Manual",
        "exit_Process"                  : "http://192.168.1.69:8888/SAS/Process/api/exit_Process",
        "exit_Parameters"               : "http://192.168.1.69:8888/SAS/Parameters/api/exit_Parameters",
        "exit_VisuReception"            : "http://192.168.1.69:8888/SAS/VReception/api/exit_VReception"

    }

}