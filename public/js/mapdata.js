var simplemaps_usmap_mapdata = {

	main_settings:{
		//General settings
		width: 600,
		background_color: '#FFFFFF',	
		background_transparent: 'no',
		label_color: '#d5ddec',		
		border_color: '#FFFFFF',
		pop_ups: 'detect', //on_click, on_hover, or detect
	
		//State defaults
		state_description:   'State description',
		state_color: '#88A4BC',
		state_hover_color: '#3B729F',
		state_url: 'http://simplemaps.com',
		all_states_inactive: 'no',
		
		//Location defaults
		location_description:  'Location description',
		location_color: '#FF0067',
		location_opacity: .8,
		location_url: 'http://simplemaps.com',
		location_size: 25,
		location_type: 'circle', //or circle
		all_locations_inactive: 'no',
		
		//Advanced settings - safe to ignore these
		url_new_tab: 'no',  
		div: 'map',
		arrow_color: '#3B729F',
		arrow_color_border: '#88A4BC',
		border_size: 1.5,
		popup_color: 'white',
		popup_opacity: .9,
		popup_shadow: 1,
		popup_corners: 5,
		popup_font: '12px/1.5 Verdana, Arial, Helvetica, sans-serif',
		popup_nocss: 'no',		
		initial_zoom: -1,  //-1 is zoomed out, 0 is for the first continent etc	
		initial_zoom_solo: 'no',
		all_states_zoomable: 'no',
		auto_load: 'yes',
		zoom: 'yes',
		js_hooks: 'no',
		hide_labels: 'no'  //Note:  You must omit the comma after the last property in an object to prevent errors in internet explorer.
	},

	state_specific:{	
		HI: {
			name: 'Hawaii',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		AK: {
			name: 'Alaska',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		FL: {
			name: 'Florida',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default',
			inactive: 'no'
			},
		NH: {
			name: 'New Hampshire',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		VT: {
			name: 'Vermont',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		ME: {
			name: 'Maine',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'	
			},
		RI: {
			name: 'Rhode Island',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		NY: {
			name: 'New York',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'	
		},
		PA: {
			name: 'Pennsylvania',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		NJ: {
			name: 'New Jersey',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		DE: {
			name: 'Delaware',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		MD: {
			name: 'Maryland',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'						
			},
		VA: {
			name: 'Virginia',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		WV: {
			name: 'West Virginia',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		OH: {
			name: 'Ohio',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		IN: {
			name: 'Indiana',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		IL: {
			name: 'Illinois',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		CT: {
			name: 'Connecticut',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		WI: {
			name: 'Wisconsin',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		NC: {
			name: 'North Carolina',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		DC: {
			name: 'District of Columbia',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		MA: {
			name: 'Massachusetts',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		TN: {
			name: 'Tennessee',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		AR: {
			name: 'Arkansas',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		MO: {
			name: 'Missouri',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		GA: {
			name: 'Georgia',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		SC: {
			name: 'South Carolina',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		KY: {
			name: 'Kentucky',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		AL: {
			name: 'Alabama',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'					
			},
		LA: {
			name: 'Louisiana',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		MS: {
			name: 'Mississippi',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		IA: {
			name: 'Iowa',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		MN: {
			name: 'Minnesota',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		OK: {
			name: 'Oklahoma',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		TX: {
			name: 'Texas',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		NM: {
			name: 'New Mexico',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		KS: {
			name: 'Kansas',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'			
			},
		NE: {
			name: 'Nebraska',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		SD: {
			name: 'South Dakota',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		ND: {
			name: 'North Dakota',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		WY: {
			name: 'Wyoming',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		MT: {
			name: 'Montana',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		CO: {
			name: 'Colorado',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		UT: {
			name: 'Utah',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		AZ: {
			name: 'Arizona',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		NV: {
			name: 'Nevada',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		OR: {
			name: 'Oregon',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'		
			},
		WA: {
			name: 'Washington',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		CA: {
			name: 'California',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'					
			},
		MI: {
			name: 'Michigan',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'				
			},
		ID: {
			name: 'Idaho',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default'
			},
		// Territories - Hidden unless hide is set to "no"
		GU: {
			name: 'Guam',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default',
			hide: 'yes'
			},
		VI: {
			name: 'Virgin Islands',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default',
			hide: 'yes'
			},
		PR: {
			name: 'Puerto Rico',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default',
			hide: 'yes'
			},
		MP: {
			name: 'Northern Mariana Islands',
			description: 'default',
			color: 'default',
			hover_color: 'default',
			url: 'default',
			hide: 'yes'
			}		
		},
	
	locations:{
		0: {
			name: "New York",
			lat: 40.71, 
			lng: -74.0059731,
			description: 'default',
			color: 'default',
			url: 'default',
			size: 'default' //Note:  You must omit the comma after the last property in an object to prevent errors in internet explorer.
		},
		1: {
			name: 'Anchorage',
			lat: 61.2180556,
			lng: -149.9002778, 
			color: 'default',
			type: 'circle'
		}
	}

} //end of simplemaps_worldmap_mapdata




